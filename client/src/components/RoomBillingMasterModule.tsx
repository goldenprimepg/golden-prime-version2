import { useState, useMemo, FormEvent } from "react";
import { 
  Building2, 
  BedDouble, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  CreditCard, 
  FileText, 
  MessageCircle, 
  Plus, 
  ReceiptIndianRupee, 
  Search, 
  ShieldAlert, 
  User, 
  Users, 
  Zap, 
  ChevronRight, 
  X,
  History,
  ArrowUpRight,
  Wallet
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/format";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { buildWhatsAppShareUrl, buildReminderShareMessage } from "@shared/sharing";

interface RoomBillingMasterModuleProps {
  buildingId: number;
  billingMonth: string; // e.g. "2026-10"
  snapshotData: any;
  onInvalidate: () => Promise<void>;
}

export function RoomBillingMasterModule({
  buildingId,
  billingMonth,
  snapshotData,
  onInvalidate,
}: RoomBillingMasterModuleProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "paid" | "partial">("all");
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);

  // Mutations for quick actions inside drill-down
  const recordRentPayment = trpc.pg.rents.save.useMutation({
    onSuccess: async () => {
      await onInvalidate();
      toast.success("Rent payment recorded successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  const recordElectricityPayment = trpc.pg.electricity.save.useMutation({
    onSuccess: async () => {
      await onInvalidate();
      toast.success("Electricity bill payment recorded successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  const addCreditMutation = trpc.pg.credits.save.useMutation({
    onSuccess: async () => {
      await onInvalidate();
      toast.success("Credit / Advance adjusted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  const rooms = snapshotData?.rooms ?? [];
  const tenants = snapshotData?.tenants ?? [];
  const allocations = snapshotData?.allocations ?? [];
  const rents = snapshotData?.rents ?? [];
  const electricityBills = snapshotData?.electricityBills ?? [];
  const credits = snapshotData?.credits ?? [];
  const creditLedgers = snapshotData?.creditLedgers ?? [];

  // Room-wise aggregated data mapping (Issue 1 & 2 resolved with multi-tenant & historical awareness)
  const roomBillingSummaries = useMemo(() => {
    return rooms.map((room: any) => {
      // Find all allocations for this room (current and historical)
      const roomAllocations = allocations.filter((a: any) => a.roomId === room.id);
      const activeAllocations = roomAllocations.filter((a: any) => a.isActive !== false);
      
      // Tenants currently or formerly in this room
      const tenantIds = Array.from(new Set(roomAllocations.map((a: any) => a.tenantId)));
      const roomTenants = tenants.filter((t: any) => tenantIds.includes(t.id));
      const activeTenants = tenants.filter((t: any) => activeAllocations.some((a: any) => a.tenantId === t.id));

      // Bills for this room in selected month
      const roomRents = rents.filter((r: any) => r.roomId === room.id && r.billingMonth === billingMonth);
      const roomElec = electricityBills.find((e: any) => e.roomId === room.id && e.billingMonth === billingMonth);

      // Financial calculations
      const totalRentExpected = roomRents.reduce((sum: number, r: any) => sum + (r.expectedAmountPaise || 0), 0);
      const totalRentPaid = roomRents.reduce((sum: number, r: any) => sum + (r.paidAmountPaise || 0), 0);
      const elecExpected = roomElec ? roomElec.expectedAmountPaise : 0;
      const elecPaid = roomElec ? roomElec.paidAmountPaise : 0;

      const totalExpected = totalRentExpected + elecExpected;
      const totalPaid = totalRentPaid + elecPaid;

      // Status determination
      let status: "paid" | "partial" | "pending" | "none" = "none";
      if (totalExpected > 0) {
        if (totalPaid >= totalExpected) status = "paid";
        else if (totalPaid > 0) status = "partial";
        else status = "pending";
      } else if (activeAllocations.length > 0) {
        status = "pending";
      }

      // Credits for room tenants
      const roomCredits = credits.filter((c: any) => tenantIds.includes(c.tenantId));
      const totalCreditBalance = roomCredits.reduce((sum: number, c: any) => sum + (c.balancePaise || 0), 0);

      return {
        room,
        roomAllocations,
        activeAllocations,
        roomTenants,
        activeTenants,
        roomRents,
        roomElec,
        totalRentExpected,
        totalRentPaid,
        elecExpected,
        elecPaid,
        totalExpected,
        totalPaid,
        status,
        totalCreditBalance,
      };
    });
  }, [rooms, allocations, tenants, rents, electricityBills, credits, billingMonth]);

  // Filtered rooms
  const filteredSummaries = useMemo(() => {
    return roomBillingSummaries.filter((item: any) => {
      // Search query match (room number, tenant name, phone)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesRoom = item.room.number.toLowerCase().includes(q) || item.room.roomType?.toLowerCase().includes(q);
        const matchesTenant = item.roomTenants.some((t: any) => 
          t.fullName?.toLowerCase().includes(q) || t.phone?.toLowerCase().includes(q)
        );
        if (!matchesRoom && !matchesTenant) return false;
      }
      // Status filter match
      if (filterStatus !== "all" && item.status !== filterStatus) return false;
      return true;
    });
  }, [roomBillingSummaries, searchQuery, filterStatus]);

  // Selected room detailed data for drill-down modal
  const selectedSummary = useMemo(() => {
    if (!selectedRoomId) return null;
    return roomBillingSummaries.find((item: any) => item.room.id === selectedRoomId) || null;
  }, [roomBillingSummaries, selectedRoomId]);

  // Historical bills for selected room across all months (Issue 2 fix)
  const roomHistory = useMemo(() => {
    if (!selectedRoomId) return { rents: [], electricity: [] };
    const allRents = rents.filter((r: any) => r.roomId === selectedRoomId).sort((a: any, b: any) => b.billingMonth.localeCompare(a.billingMonth));
    const allElec = electricityBills.filter((e: any) => e.roomId === selectedRoomId).sort((a: any, b: any) => b.billingMonth.localeCompare(a.billingMonth));
    return { rents: allRents, electricity: allElec };
  }, [selectedRoomId, rents, electricityBills]);

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col gap-4 rounded-3xl border border-border/80 bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <ReceiptIndianRupee className="h-4 w-4" />
            </span>
            <h2 className="text-base font-bold text-foreground">Room-Wise Billing & Collection Master</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Month: <strong className="text-foreground">{billingMonth}</strong> · Click any room card to manage tenants, active bills, payment history, and credits in one unified place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search room or tenant…"
              className="h-10 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex rounded-xl border border-border bg-muted/40 p-1">
            {(["all", "pending", "partial", "paid"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition ${
                  filterStatus === st ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Room Grid Cards */}
      {filteredSummaries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border p-12 text-center">
          <BedDouble className="mx-auto h-10 w-10 text-muted-foreground/50" />
          <h3 className="mt-3 text-sm font-semibold text-foreground">No rooms found matching your filter</h3>
          <p className="mt-1 text-xs text-muted-foreground">Try adjusting your search query or status filter.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSummaries.map((item: any) => {
            const { room, activeTenants, roomTenants, totalExpected, totalPaid, status, totalCreditBalance } = item;
            const badgeClass =
              status === "paid"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : status === "partial"
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : status === "pending"
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-slate-100 text-slate-600 border-slate-200";

            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 font-bold text-primary">
                        {room.number}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">Room {room.number}</h3>
                        <p className="text-[11px] capitalize text-muted-foreground">
                          {room.roomType || "Standard"} · Cap: {room.capacity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${badgeClass}`}>
                    {status === "paid" && <CheckCircle2 className="h-3 w-3" />}
                    {status === "pending" && <AlertCircle className="h-3 w-3" />}
                    {status}
                  </span>
                </div>

                {/* Tenant Info */}
                <div className="mt-4 rounded-2xl bg-muted/40 p-3">
                  {activeTenants.length > 0 ? (
                    <div className="space-y-1">
                      {activeTenants.map((t: any) => (
                        <div key={t.id} className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-foreground flex items-center gap-1.5 truncate">
                            <User className="h-3.5 w-3.5 text-primary shrink-0" />
                            {t.fullName}
                          </span>
                          <span className="text-muted-foreground">{t.phone}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs italic text-muted-foreground">Vacant / No active tenant</p>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-border/60 text-xs">
                  <div>
                    <span className="text-muted-foreground">Expected / Billed</span>
                    <p className="font-bold text-foreground">{formatCurrency(totalExpected)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Paid Received</span>
                    <p className="font-bold text-emerald-600">{formatCurrency(totalPaid)}</p>
                  </div>
                </div>

                {totalCreditBalance > 0 && (
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg">
                    <Wallet className="h-3 w-3" />
                    Credit Wallet: {formatCurrency(totalCreditBalance)}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
                  <span>Manage Room & History</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Room Drill-Down Modal / Drawer (Full Management & Handling) */}
      {selectedSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-card shadow-2xl border border-border">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-6 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-bold">
                  {selectedSummary.room.number}
                </span>
                <div>
                  <h2 className="text-base font-bold text-foreground">Room {selectedSummary.room.number} · Master Management</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedSummary.room.roomType} · Capacity: {selectedSummary.room.capacity} · Month: {billingMonth}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedRoomId(null)}
                className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 p-6">
              {/* Section 1: Tenants & Occupancy */}
              <div className="rounded-2xl border border-border bg-muted/20 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Room Occupants & Tenants
                  </h3>
                </div>
                {selectedSummary.roomTenants.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {selectedSummary.roomTenants.map((tenant: any) => {
                      const isActive = selectedSummary.activeTenants.some((t: any) => t.id === tenant.id);
                      const tenantCredits = credits.find((c: any) => c.tenantId === tenant.id)?.balancePaise || 0;
                      return (
                        <div key={tenant.id} className="rounded-xl border border-border bg-card p-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-bold text-foreground">{tenant.fullName}</h4>
                              <p className="text-xs text-muted-foreground">{tenant.phone}</p>
                            </div>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                              {isActive ? "Current Resident" : "Former Resident"}
                            </span>
                          </div>
                          {tenantCredits > 0 && (
                            <div className="flex items-center justify-between text-xs bg-sky-50 text-sky-800 px-2.5 py-1 rounded-lg">
                              <span>Advance Credit Balance</span>
                              <strong className="font-bold">{formatCurrency(tenantCredits)}</strong>
                            </div>
                          )}
                          <div className="flex gap-2 pt-1">
                            <a
                              href={buildWhatsAppShareUrl(tenant.phone, `Hello ${tenant.fullName}, regarding your rent/bill for Room ${selectedSummary.room.number} (${billingMonth}), please clear your dues at your earliest convenience.`)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-600 px-3 text-xs font-semibold text-white hover:bg-emerald-700"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              WhatsApp Reminder
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs italic text-muted-foreground">No tenant records linked to this room.</p>
                )}
              </div>

              {/* Section 2: Active Bills for {billingMonth} */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                  <ReceiptIndianRupee className="h-4 w-4 text-primary" />
                  Active Bills & Dues ({billingMonth})
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Rent Bill Card */}
                  <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-foreground">Rent Ledger</h4>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${selectedSummary.totalRentPaid >= selectedSummary.totalRentExpected && selectedSummary.totalRentExpected > 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {selectedSummary.totalRentPaid >= selectedSummary.totalRentExpected && selectedSummary.totalRentExpected > 0 ? "Paid" : "Pending / Due"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Expected Rent:</span>
                      <strong className="text-foreground">{formatCurrency(selectedSummary.totalRentExpected)}</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Paid Received:</span>
                      <strong className="text-emerald-600">{formatCurrency(selectedSummary.totalRentPaid)}</strong>
                    </div>

                    {selectedSummary.roomRents.map((rentItem: any) => (
                      <div key={rentItem.id} className="pt-2 border-t border-border flex items-center justify-between text-xs">
                        <span>Allocation ID #{rentItem.roomAllocationId}</span>
                        {rentItem.paidAmountPaise < rentItem.expectedAmountPaise ? (
                          <button
                            onClick={() => {
                              recordRentPayment.mutate({
                                id: rentItem.id,
                                roomAllocationId: rentItem.roomAllocationId,
                                billingMonth: billingMonth,
                                expectedAmountPaise: rentItem.expectedAmountPaise,
                                paidAmountPaise: rentItem.expectedAmountPaise,
                                paymentMethod: "upi",
                                dueDate: rentItem.dueDate || new Date().toISOString().slice(0, 10),
                                notes: "Marked full paid from Room Master",
                              });
                            }}
                            className="h-7 rounded-lg bg-primary px-2.5 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90"
                          >
                            Mark Full Paid
                          </button>
                        ) : (
                          <span className="text-emerald-600 font-bold">Settled</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Electricity Bill Card */}
                  <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase text-foreground flex items-center gap-1.5">
                        <Zap className="h-3.5 w-3.5 text-amber-600" />
                        Electricity Bill
                      </h4>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${selectedSummary.roomElec && selectedSummary.roomElec.paidAmountPaise >= selectedSummary.roomElec.expectedAmountPaise ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                        {selectedSummary.roomElec && selectedSummary.roomElec.paidAmountPaise >= selectedSummary.roomElec.expectedAmountPaise ? "Paid" : "Pending"}
                      </span>
                    </div>
                    {selectedSummary.roomElec ? (
                      <>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Units Consumed:</span>
                          <strong>{selectedSummary.roomElec.currentReading - selectedSummary.roomElec.previousReading} units</strong>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Expected Amount:</span>
                          <strong>{formatCurrency(selectedSummary.roomElec.expectedAmountPaise)}</strong>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Paid Amount:</span>
                          <strong className="text-emerald-600">{formatCurrency(selectedSummary.roomElec.paidAmountPaise)}</strong>
                        </div>
                        {selectedSummary.roomElec.paidAmountPaise < selectedSummary.roomElec.expectedAmountPaise && (
                          <div className="pt-2 border-t border-border flex justify-end">
                            <button
                              onClick={() => {
                                recordElectricityPayment.mutate({
                                  roomId: selectedRoomId!,
                                  billingMonth: billingMonth,
                                  previousReading: selectedSummary.roomElec.previousReading,
                                  currentReading: selectedSummary.roomElec.currentReading,
                                  ratePaise: selectedSummary.roomElec.ratePaise || 1000,
                                  expectedAmountPaise: selectedSummary.roomElec.expectedAmountPaise,
                                  paidAmountPaise: selectedSummary.roomElec.expectedAmountPaise,
                                  paymentMethod: "upi",
                                  dueDate: selectedSummary.roomElec.dueDate || new Date().toISOString().slice(0, 10),
                                  notes: "Marked full paid from Room Master",
                                });
                              }}
                              className="h-7 rounded-lg bg-amber-600 px-2.5 text-[11px] font-semibold text-white hover:bg-amber-700"
                            >
                              Settle Electricity
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-xs italic text-muted-foreground">No electricity meter reading saved for {billingMonth}.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Complete History & Credit Ledger (Issue 2 fix) */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-4">
                  <History className="h-4 w-4 text-primary" />
                  Historical Bills & Payment Records
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {roomHistory.rents.length > 0 || roomHistory.electricity.length > 0 ? (
                    <>
                      {roomHistory.rents.map((r: any) => (
                        <div key={`rent-${r.id}`} className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-2.5 text-xs">
                          <div>
                            <span className="font-bold text-foreground">Rent · {r.billingMonth}</span>
                            <p className="text-[11px] text-muted-foreground">Expected: {formatCurrency(r.expectedAmountPaise)}</p>
                          </div>
                          <span className={`font-semibold ${r.paidAmountPaise >= r.expectedAmountPaise ? "text-emerald-600" : "text-rose-600"}`}>
                            Paid: {formatCurrency(r.paidAmountPaise)}
                          </span>
                        </div>
                      ))}
                      {roomHistory.electricity.map((e: any) => (
                        <div key={`elec-${e.id}`} className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-2.5 text-xs">
                          <div>
                            <span className="font-bold text-foreground">Electricity · {e.billingMonth}</span>
                            <p className="text-[11px] text-muted-foreground">Units: {e.currentReading - e.previousReading}</p>
                          </div>
                          <span className={`font-semibold ${e.paidAmountPaise >= e.expectedAmountPaise ? "text-emerald-600" : "text-rose-600"}`}>
                            Paid: {formatCurrency(e.paidAmountPaise)}
                          </span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-xs italic text-muted-foreground">No historical billing records found for this room.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end border-t border-border bg-card/95 px-6 py-4">
              <button
                onClick={() => setSelectedRoomId(null)}
                className="h-10 rounded-xl bg-primary px-5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Close Room Manager
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
