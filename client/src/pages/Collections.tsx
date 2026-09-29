import {
  BedDouble,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  MessageCircle,
  Plus,
  ReceiptIndianRupee,
  RefreshCw,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  UserPlus,
  Zap,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { BuildingEmptyState, LoadingState } from "@/components/AppStates";
import { useDeletionSafety } from "@/components/DeletionSafety";
import { PageHeader } from "@/components/PageHeader";
import { formatCurrency } from "@/lib/format";
import { trpc } from "@/lib/trpc";
import { useActiveBuilding } from "@/hooks/useActiveBuilding";
import { buildReminderShareMessage, buildWhatsAppShareUrl } from "@shared/sharing";

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10";
const monthNow = () => new Date().toISOString().slice(0, 7);
const todayIso = () => new Date().toISOString().slice(0, 10);

type RoomTypeOption = "single" | "double" | "triple" | "four" | "individual" | "coliving";
type PaymentMethodOption = "upi" | "cash" | "bank_transfer";
type QuickRentStatus = "paid" | "partial" | "pending";

const ROOM_TYPE_LABELS: Record<RoomTypeOption, string> = {
  single: "Single",
  double: "Double sharing",
  triple: "Triple sharing",
  four: "Four sharing",
  individual: "Individual room",
  coliving: "Co-living",
};

function getCapacityForRoomType(roomType: RoomTypeOption, currentCapacity: number) {
  if (roomType === "single") return 1;
  if (roomType === "double" || roomType === "coliving") return 2;
  if (roomType === "triple") return 3;
  if (roomType === "four") return 4;
  return Math.max(1, currentCapacity || 1);
}

function getSuggestedBedRentRupees(
  room: { id: number; defaultRentPaise: number; capacity: number; roomType: string } | undefined,
  activeAllocations: Array<{ roomId: number; monthlyRentPaise: number }>,
) {
  if (!room) return "5000";
  const roomActive = activeAllocations.filter(item => item.roomId === room.id);
  if (roomActive.length > 0) {
    const avgPaise = Math.round(roomActive.reduce((sum, item) => sum + item.monthlyRentPaise, 0) / roomActive.length);
    return String(Math.round(avgPaise / 100));
  }
  if (room.roomType === "individual" || room.capacity <= 1) {
    return String(Math.round(room.defaultRentPaise / 100));
  }
  return String(Math.round(room.defaultRentPaise / Math.max(1, room.capacity) / 100));
}

type CardDraft = {
  expectedRentRupees: string;
  rentStatus: QuickRentStatus;
  rentPaidRupees: string;
  dueDate: string;
  paymentMethod: PaymentMethodOption;
  notes: string;
  prevReading: string;
  currReading: string;
  elecStatus: QuickRentStatus;
  elecPaidRupees: string;
};

export default function Collections() {
  const [location] = useLocation();
  const { buildingsQuery, building, buildingId, setBuildingId, snapshotQuery: snapshot } = useActiveBuilding();
  const utils = trpc.useUtils();
  const deletionSafety = useDeletionSafety();
  const requestedMonth = new URLSearchParams(location.split("?")[1] ?? "").get("month");
  const [month, setMonth] = useState(() =>
    requestedMonth && /^\d{4}-\d{2}$/.test(requestedMonth) ? requestedMonth : monthNow(),
  );
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "partial" | "paid">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editor, setEditor] = useState<string | null>(null);
  const [showLegacyLedger, setShowLegacyLedger] = useState(false);

  // Unified Onboarding & Room Allocation state (single-tab workflow)
  const [showOnboardPanel, setShowOnboardPanel] = useState(false);
  const [onboardMode, setOnboardMode] = useState<"new_tenant" | "existing_tenant">("new_tenant");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [selectedExistingTenantId, setSelectedExistingTenantId] = useState<string>("");
  const [onboardRoomType, setOnboardRoomType] = useState<RoomTypeOption>("double");
  const [onboardRoomCapacity, setOnboardRoomCapacity] = useState<string>("2");
  const [onboardRentRupees, setOnboardRentRupees] = useState<string>("");
  const [onboardDepositRupees, setOnboardDepositRupees] = useState<string>("0");
  const [onboardMoveInDate, setOnboardMoveInDate] = useState<string>(() => todayIso());
  const [onboardBedLabel, setOnboardBedLabel] = useState<string>("");
  const [onboardFullName, setOnboardFullName] = useState<string>("");
  const [onboardPhone, setOnboardPhone] = useState<string>("");
  const [onboardPassword, setOnboardPassword] = useState<string>("GoldenPrime2026");
  const [onboardTiffinEnabled, setOnboardTiffinEnabled] = useState(false);
  const [onboardTiffinRupees, setOnboardTiffinRupees] = useState("2500");
  const [onboardWaterEnabled, setOnboardWaterEnabled] = useState(false);
  const [onboardWaterRupees, setOnboardWaterRupees] = useState("300");
  const [onboardOtherEnabled, setOnboardOtherEnabled] = useState(false);
  const [onboardOtherRupees, setOnboardOtherRupees] = useState("500");
  const [onboardOtherNotes, setOnboardOtherNotes] = useState("");

  // Per-card inline settings drawer state (update decided rent, room type, services without switching tabs)
  const [expandedSetupAllocationId, setExpandedSetupAllocationId] = useState<number | null>(null);
  const [setupRoomType, setSetupRoomType] = useState<RoomTypeOption>("double");
  const [setupDecidedRentRupees, setSetupDecidedRentRupees] = useState<string>("");
  const [setupDepositRupees, setSetupDepositRupees] = useState<string>("0");
  const [setupNewServiceType, setSetupNewServiceType] = useState<"tiffin" | "water_bottle" | "other">("tiffin");
  const [setupNewServiceRupees, setSetupNewServiceRupees] = useState<string>("2500");
  const [setupNewServiceNotes, setSetupNewServiceNotes] = useState<string>("");

  // Per-card monthly Rent + Electricity draft state
  const [cardDrafts, setCardDrafts] = useState<Record<number, CardDraft>>({});
  const [savingAllocationId, setSavingAllocationId] = useState<number | null>(null);

  const refresh = async () => {
    await utils.pg.operations.snapshot.invalidate();
    await utils.pg.dashboard.get.invalidate();
    await utils.pg.profit.get.invalidate();
  };

  const generateCycle = trpc.pg.rent.generateCycle.useMutation({
    onSuccess: async () => {
      await refresh();
      toast.success(`Synced monthly rent & service bills for ${month}`);
    },
    onError: error => toast.error(error.message),
  });
  const upsertRent = trpc.pg.rent.upsert.useMutation({ onError: error => toast.error(error.message) });
  const updateRent = trpc.pg.rent.update.useMutation({
    onSuccess: async data => {
      await refresh();
      setEditor(null);
      toast.success(`Rent is now ${data.status}`);
    },
    onError: error => toast.error(error.message),
  });
  const upsertElectricity = trpc.pg.electricity.upsert.useMutation({ onError: error => toast.error(error.message) });
  const updateElectricity = trpc.pg.electricity.update.useMutation({ onError: error => toast.error(error.message) });
  const updateCharge = trpc.pg.tenantCharges.recordPayment.useMutation({
    onSuccess: async () => {
      await refresh();
      setEditor(null);
      toast.success("Collection status updated");
    },
    onError: error => toast.error(error.message),
  });
  const deleteRent = trpc.pg.rent.delete.useMutation({
    onSuccess: async data => {
      await refresh();
      setEditor(null);
      deletionSafety.offerUndo({
        auditId: data.auditId,
        buildingId: buildingId ?? 0,
        label: "Rent record",
        onRestored: refresh,
      });
    },
    onError: error => toast.error(error.message),
  });
  const deleteCharge = trpc.pg.tenantCharges.delete.useMutation({
    onSuccess: async data => {
      await refresh();
      setEditor(null);
      deletionSafety.offerUndo({
        auditId: data.auditId,
        buildingId: buildingId ?? 0,
        label: "Tenant collection",
        onRestored: refresh,
      });
    },
    onError: error => toast.error(error.message),
  });

  const updateRoom = trpc.pg.operations.updateRoom.useMutation({ onError: error => toast.error(error.message) });
  const updateAllocation = trpc.pg.operations.updateAllocation.useMutation({
    onError: error => toast.error(error.message),
  });
  const createTenantForRoom = trpc.pg.operations.createTenantForRoom.useMutation({
    onError: error => toast.error(error.message),
  });
  const allocateTenantWithServices = trpc.pg.operations.allocateTenantWithServices.useMutation({
    onError: error => toast.error(error.message),
  });
  const createTenantService = trpc.pg.operations.createTenantService.useMutation({
    onSuccess: async () => {
      if (buildingId) await generateCycle.mutateAsync({ buildingId, rentMonth: month });
      await refresh();
      toast.success("Recurring service added and synced to this month");
    },
    onError: error => toast.error(error.message),
  });
  const deleteTenantService = trpc.pg.operations.deleteTenantService.useMutation({
    onSuccess: async () => {
      await refresh();
      toast.success("Service removed");
    },
    onError: error => toast.error(error.message),
  });

  const activeAllocations = useMemo(
    () => (snapshot.data?.allocations ?? []).filter(allocation => allocation.status === "active"),
    [snapshot.data?.allocations],
  );

  const vacantRooms = useMemo(() => {
    if (!snapshot.data) return [];
    const occupiedByRoom = new Map<number, number>();
    activeAllocations.forEach(allocation => {
      occupiedByRoom.set(allocation.roomId, (occupiedByRoom.get(allocation.roomId) ?? 0) + 1);
    });
    return snapshot.data.rooms
      .map(room => {
        const occupied = occupiedByRoom.get(room.id) ?? 0;
        const availableBeds = Math.max(room.capacity - occupied, 0);
        return { ...room, occupied, availableBeds };
      })
      .filter(room => room.availableBeds > 0);
  }, [activeAllocations, snapshot.data]);

  const unallocatedTenants = useMemo(() => {
    if (!snapshot.data) return [];
    const allocatedIds = new Set(activeAllocations.map(item => item.tenantId));
    return snapshot.data.tenants.filter(tenant => tenant.status === "active" && !allocatedIds.has(tenant.id));
  }, [activeAllocations, snapshot.data]);

  useEffect(() => {
    if (!selectedRoomId && vacantRooms.length > 0) {
      const firstRoom = vacantRooms[0]!;
      setSelectedRoomId(String(firstRoom.id));
      setOnboardRoomType(firstRoom.roomType as RoomTypeOption);
      setOnboardRoomCapacity(String(firstRoom.capacity));
      setOnboardRentRupees(getSuggestedBedRentRupees(firstRoom, activeAllocations));
    }
  }, [vacantRooms, selectedRoomId, activeAllocations]);

  const handleSelectOnboardRoom = (roomIdStr: string) => {
    setSelectedRoomId(roomIdStr);
    const room = snapshot.data?.rooms.find(item => item.id === Number(roomIdStr));
    if (room) {
      setOnboardRoomType(room.roomType as RoomTypeOption);
      setOnboardRoomCapacity(String(room.capacity));
      setOnboardRentRupees(getSuggestedBedRentRupees(room, activeAllocations));
    }
  };

  const rows = useMemo(() => {
    if (!snapshot.data) return [];
    const tenantName = new Map(snapshot.data.tenants.map(tenant => [tenant.id, tenant.fullName]));
    const roomById = new Map(snapshot.data.rooms.map(room => [room.id, room.number]));
    const rents = snapshot.data.rents
      .filter(rent => rent.rentMonth === month)
      .map(rent => ({
        key: `rent-${rent.id}`,
        kind: "rent" as const,
        id: rent.id,
        tenantName: tenantName.get(rent.tenantId) ?? "Tenant",
        title: `Rent · ${rent.rentMonth}`,
        room: roomById.get(
          snapshot.data.allocations.find(allocation => allocation.id === rent.allocationId)?.roomId ?? 0,
        ),
        expectedAmountPaise: rent.expectedAmountPaise,
        paidAmountPaise: rent.paidAmountPaise,
        status: rent.status,
        dueDate: rent.dueDate,
        updatedAt: rent.updatedAt,
        notes: rent.notes,
        paymentMethod: rent.paymentMethod,
        paidOn: rent.paidOn,
      }));
    const charges = snapshot.data.tenantCharges
      .filter(charge => charge.billingMonth === month)
      .map(charge => ({
        key: `charge-${charge.id}`,
        kind: "charge" as const,
        id: charge.id,
        tenantName: tenantName.get(charge.tenantId) ?? "Tenant",
        title: charge.title,
        room: charge.roomId ? roomById.get(charge.roomId) : undefined,
        expectedAmountPaise: charge.expectedAmountPaise,
        paidAmountPaise: charge.paidAmountPaise,
        status: charge.status,
        dueDate: charge.dueDate ?? "—",
        updatedAt: charge.updatedAt,
        notes: charge.notes,
        paymentMethod: charge.paymentMethod,
        paidOn: charge.paidOn,
      }));
    return [...rents, ...charges].filter(row => statusFilter === "all" || row.status === statusFilter);
  }, [month, snapshot.data, statusFilter]);

  // Unified Tenant + Room Monthly Cards for single-tab operations
  const unifiedCards = useMemo(() => {
    if (!snapshot.data || !building) return [];
    const tenantById = new Map(snapshot.data.tenants.map(t => [t.id, t]));
    const roomById = new Map(snapshot.data.rooms.map(r => [r.id, r]));
    const floorById = new Map(snapshot.data.floors.map(f => [f.id, f]));

    return activeAllocations
      .map(allocation => {
        const tenant = tenantById.get(allocation.tenantId);
        const room = roomById.get(allocation.roomId);
        if (!tenant || !room) return null;
        const floor = floorById.get(room.floorId);

        const rentRecord =
          snapshot.data.rents.find(
            r => r.allocationId === allocation.id && r.rentMonth === month,
          ) ??
          snapshot.data.rents.find(
            r => r.tenantId === tenant.id && r.rentMonth === month,
          ) ??
          null;

        const roomElectricityBill =
          snapshot.data.electricity.find(
            b => b.roomId === room.id && b.billingMonth === month,
          ) ?? null;

        // Previous meter reading fallback if no bill exists for this month yet
        const previousBills = snapshot.data.electricity
          .filter(b => b.roomId === room.id && b.billingMonth < month)
          .sort((a, b) => b.billingMonth.localeCompare(a.billingMonth));
        const fallbackPreviousReading = previousBills[0]?.currentReading ?? 0;

        const tenantElectricityCharge =
          snapshot.data.tenantCharges.find(
            c =>
              c.tenantId === tenant.id &&
              c.sourceType === "electricity" &&
              c.billingMonth === month,
          ) ?? null;

        const otherCharges = snapshot.data.tenantCharges.filter(
          c =>
            c.tenantId === tenant.id &&
            c.sourceType !== "electricity" &&
            c.billingMonth === month,
        );

        const services = snapshot.data.tenantServices.filter(
          s => s.tenantId === tenant.id && s.active === "active",
        );

        const roomOccupantCount = Math.max(
          1,
          activeAllocations.filter(a => a.roomId === room.id).length,
        );

        const rentExpectedPaise = rentRecord?.expectedAmountPaise ?? allocation.monthlyRentPaise;
        const rentPaidPaise = rentRecord?.paidAmountPaise ?? 0;
        const rentStatus: QuickRentStatus =
          rentRecord?.status ??
          (rentPaidPaise <= 0 ? "pending" : rentPaidPaise >= rentExpectedPaise ? "paid" : "partial");

        const elecExpectedPaise = tenantElectricityCharge
          ? tenantElectricityCharge.expectedAmountPaise
          : room.billingMode === "manager_set" && roomElectricityBill
            ? Math.round(roomElectricityBill.billAmountPaise / roomOccupantCount)
            : 0;
        const elecPaidPaise = tenantElectricityCharge
          ? tenantElectricityCharge.paidAmountPaise
          : room.billingMode === "manager_set" && roomElectricityBill
            ? Math.round(roomElectricityBill.paidAmountPaise / roomOccupantCount)
            : 0;

        const otherExpectedPaise = otherCharges.reduce((sum, c) => sum + c.expectedAmountPaise, 0);
        const otherPaidPaise = otherCharges.reduce((sum, c) => sum + c.paidAmountPaise, 0);

        const totalExpectedPaise = rentExpectedPaise + elecExpectedPaise + otherExpectedPaise;
        const totalPaidPaise = rentPaidPaise + elecPaidPaise + otherPaidPaise;
        const totalPendingPaise = Math.max(totalExpectedPaise - totalPaidPaise, 0);

        const overallStatus: QuickRentStatus =
          totalPaidPaise <= 0
            ? "pending"
            : totalPendingPaise === 0
              ? "paid"
              : "partial";

        return {
          allocation,
          tenant,
          room,
          floor,
          roomOccupantCount,
          rentRecord,
          roomElectricityBill,
          fallbackPreviousReading,
          tenantElectricityCharge,
          otherCharges,
          services,
          rentExpectedPaise,
          rentPaidPaise,
          rentStatus,
          elecExpectedPaise,
          elecPaidPaise,
          otherExpectedPaise,
          otherPaidPaise,
          totalExpectedPaise,
          totalPaidPaise,
          totalPendingPaise,
          overallStatus,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item))
      .filter(item => {
        if (statusFilter !== "all" && item.overallStatus !== statusFilter) return false;
        const q = searchQuery.trim().toLowerCase();
        if (!q) return true;
        return (
          item.tenant.fullName.toLowerCase().includes(q) ||
          item.tenant.phone.toLowerCase().includes(q) ||
          item.room.number.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => a.room.number.localeCompare(b.room.number, undefined, { numeric: true }));
  }, [activeAllocations, building, month, searchQuery, snapshot.data, statusFilter]);

  // Accurate month summary totals across Rent + Electricity + Services
  const monthSummary = useMemo(() => {
    if (!snapshot.data) {
      return {
        rentExpected: 0,
        rentPaid: 0,
        elecExpected: 0,
        elecPaid: 0,
        servicesExpected: 0,
        servicesPaid: 0,
        totalExpected: 0,
        totalPaid: 0,
        totalPending: 0,
      };
    }
    const monthRents = snapshot.data.rents.filter(r => r.rentMonth === month);
    const rentExpected = monthRents.reduce((s, r) => s + r.expectedAmountPaise, 0);
    const rentPaid = monthRents.reduce((s, r) => s + r.paidAmountPaise, 0);

    const monthElecCharges = snapshot.data.tenantCharges.filter(
      c => c.sourceType === "electricity" && c.billingMonth === month,
    );
    const chargedBillIds = new Set(monthElecCharges.map(c => c.sourceId));
    const unsplitElecBills = snapshot.data.electricity.filter(
      b => b.billingMonth === month && !chargedBillIds.has(b.id),
    );
    const elecExpected =
      monthElecCharges.reduce((s, c) => s + c.expectedAmountPaise, 0) +
      unsplitElecBills.reduce((s, b) => s + b.billAmountPaise, 0);
    const elecPaid =
      monthElecCharges.reduce((s, c) => s + c.paidAmountPaise, 0) +
      unsplitElecBills.reduce((s, b) => s + b.paidAmountPaise, 0);

    const otherCharges = snapshot.data.tenantCharges.filter(
      c => c.sourceType !== "electricity" && c.billingMonth === month,
    );
    const servicesExpected = otherCharges.reduce((s, c) => s + c.expectedAmountPaise, 0);
    const servicesPaid = otherCharges.reduce((s, c) => s + c.paidAmountPaise, 0);

    const totalExpected = rentExpected + elecExpected + servicesExpected;
    const totalPaid = rentPaid + elecPaid + servicesPaid;
    const totalPending = Math.max(totalExpected - totalPaid, 0);

    return {
      rentExpected,
      rentPaid,
      elecExpected,
      elecPaid,
      servicesExpected,
      servicesPaid,
      totalExpected,
      totalPaid,
      totalPending,
    };
  }, [month, snapshot.data]);

  if (buildingsQuery.isLoading || snapshot.isLoading) return <LoadingState />;
  if (!building || !buildingId || !snapshot.data) return <BuildingEmptyState />;

  const selected = rows.find(row => row.key === editor) ?? null;

  const getDraftForCard = (card: (typeof unifiedCards)[number]): CardDraft => {
    const existing = cardDrafts[card.allocation.id];
    if (existing) return existing;
    const dueDefault =
      card.rentRecord?.dueDate ??
      `${month}-${String(Math.min(Math.max(building.rentDueDay || 5, 1), 28)).padStart(2, "0")}`;
    const prevReading = card.roomElectricityBill
      ? String(card.roomElectricityBill.previousReading)
      : String(card.fallbackPreviousReading);
    const currReading = card.roomElectricityBill
      ? String(card.roomElectricityBill.currentReading)
      : "";
    const elecStatus: QuickRentStatus = card.roomElectricityBill?.status ?? "pending";
    const elecPaidRupees = card.roomElectricityBill
      ? String(Math.round(card.roomElectricityBill.paidAmountPaise / 100))
      : "0";

    return {
      expectedRentRupees: String(Math.round(card.rentExpectedPaise / 100)),
      rentStatus: card.rentStatus,
      rentPaidRupees: String(Math.round(card.rentPaidPaise / 100)),
      dueDate: dueDefault,
      paymentMethod: (card.rentRecord?.paymentMethod ?? "upi") as PaymentMethodOption,
      notes: card.rentRecord?.notes ?? "",
      prevReading,
      currReading,
      elecStatus,
      elecPaidRupees,
    };
  };

  const updateCardDraft = (
    card: (typeof unifiedCards)[number],
    patch: Partial<CardDraft>,
  ) => {
    const current = getDraftForCard(card);
    const next = { ...current, ...patch };
    setCardDrafts(prev => ({ ...prev, [card.allocation.id]: next }));
  };

  const handleQuickRentStatus = (
    card: (typeof unifiedCards)[number],
    nextStatus: QuickRentStatus,
  ) => {
    const draft = getDraftForCard(card);
    const expectedRupees = Math.max(0, Number(draft.expectedRentRupees || 0));
    if (nextStatus === "paid") {
      updateCardDraft(card, {
        rentStatus: "paid",
        rentPaidRupees: String(expectedRupees),
      });
    } else if (nextStatus === "pending") {
      updateCardDraft(card, {
        rentStatus: "pending",
        rentPaidRupees: "0",
      });
    } else {
      const currentPaid = Number(draft.rentPaidRupees || 0);
      const suggestedPartial =
        currentPaid > 0 && currentPaid < expectedRupees
          ? currentPaid
          : Math.round(expectedRupees / 2);
      updateCardDraft(card, {
        rentStatus: "partial",
        rentPaidRupees: String(suggestedPartial),
      });
    }
  };

  const handleQuickElecStatus = (
    card: (typeof unifiedCards)[number],
    nextStatus: QuickRentStatus,
    calculatedBillRupees: number,
  ) => {
    const draft = getDraftForCard(card);
    if (nextStatus === "paid") {
      updateCardDraft(card, {
        elecStatus: "paid",
        elecPaidRupees: String(calculatedBillRupees),
      });
    } else if (nextStatus === "pending") {
      updateCardDraft(card, {
        elecStatus: "pending",
        elecPaidRupees: "0",
      });
    } else {
      const currentPaid = Number(draft.elecPaidRupees || 0);
      const suggestedPartial =
        currentPaid > 0 && currentPaid < calculatedBillRupees
          ? currentPaid
          : Math.round(calculatedBillRupees / 2);
      updateCardDraft(card, {
        elecStatus: "partial",
        elecPaidRupees: String(suggestedPartial),
      });
    }
  };

  const handleSaveUnifiedCard = async (card: (typeof unifiedCards)[number]) => {
    const draft = getDraftForCard(card);
    const expectedRentPaise = Math.max(100, Math.round(Number(draft.expectedRentRupees || 0) * 100));
    const paidRentPaise =
      draft.rentStatus === "paid"
        ? expectedRentPaise
        : draft.rentStatus === "pending"
          ? 0
          : Math.min(expectedRentPaise, Math.max(0, Math.round(Number(draft.rentPaidRupees || 0) * 100)));

    setSavingAllocationId(card.allocation.id);
    try {
      // 1. If expected rent changed from allocation's decided rent, also keep allocation rent in sync
      if (expectedRentPaise !== card.allocation.monthlyRentPaise) {
        await updateAllocation.mutateAsync({
          id: card.allocation.id,
          buildingId,
          moveInDate: card.allocation.moveInDate,
          bedLabel: card.allocation.bedLabel ?? undefined,
          monthlyRentPaise: expectedRentPaise,
          depositPaise: card.allocation.depositPaise,
        });
      }

      // 2. Save or update Monthly Rent
      if (card.rentRecord) {
        await updateRent.mutateAsync({
          id: card.rentRecord.id,
          buildingId,
          expectedUpdatedAt: card.rentRecord.updatedAt,
          dueDate: draft.dueDate,
          expectedAmountPaise: expectedRentPaise,
          paidAmountPaise: paidRentPaise,
          paidOn: paidRentPaise > 0 ? todayIso() : undefined,
          paymentMethod: draft.paymentMethod,
          notes: draft.notes || undefined,
        });
      } else {
        await upsertRent.mutateAsync({
          buildingId,
          allocationId: card.allocation.id,
          tenantId: card.tenant.id,
          rentMonth: month,
          dueDate: draft.dueDate,
          expectedAmountPaise: expectedRentPaise,
          paidAmountPaise: paidRentPaise,
          paidOn: paidRentPaise > 0 ? todayIso() : undefined,
          paymentMethod: draft.paymentMethod,
          notes: draft.notes || undefined,
        });
      }

      // 3. Save or update Monthly Electricity Reading & Bill if current reading is provided
      const hasCurrReading = draft.currReading.trim() !== "";
      if (hasCurrReading) {
        const prevReading = Math.max(0, Math.round(Number(draft.prevReading || 0)));
        const currReading = Math.max(0, Math.round(Number(draft.currReading || 0)));
        if (currReading < prevReading) {
          toast.error("Current electricity reading must be greater than or equal to previous reading.");
          setSavingAllocationId(null);
          return;
        }
        const units = currReading - prevReading;
        const billAmountPaise = units * building.electricityRatePaise;
        const elecPaidPaise =
          draft.elecStatus === "paid"
            ? billAmountPaise
            : draft.elecStatus === "pending"
              ? 0
              : Math.min(billAmountPaise, Math.max(0, Math.round(Number(draft.elecPaidRupees || 0) * 100)));

        if (card.roomElectricityBill) {
          await updateElectricity.mutateAsync({
            id: card.roomElectricityBill.id,
            buildingId,
            expectedUpdatedAt: card.roomElectricityBill.updatedAt,
            previousReading: prevReading,
            currentReading: currReading,
            paidAmountPaise: elecPaidPaise,
            paidOn: elecPaidPaise > 0 ? todayIso() : undefined,
            paymentMethod: draft.paymentMethod,
            dueDate: draft.dueDate,
          });
        } else {
          await upsertElectricity.mutateAsync({
            buildingId,
            roomId: card.room.id,
            billingMonth: month,
            previousReading: prevReading,
            currentReading: currReading,
            paidAmountPaise: elecPaidPaise,
            paidOn: elecPaidPaise > 0 ? todayIso() : undefined,
            paymentMethod: draft.paymentMethod,
            dueDate: draft.dueDate,
          });
        }
      }

      await refresh();
      setCardDrafts(prev => {
        const copy = { ...prev };
        delete copy[card.allocation.id];
        return copy;
      });
      toast.success(`Saved ${card.tenant.fullName}'s monthly rent & electricity for ${month}`);
    } catch {
      // Mutation onError handles toast
    } finally {
      setSavingAllocationId(null);
    }
  };

  const handleOnboardAndAllocate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const roomIdNum = Number(selectedRoomId);
    const room = snapshot.data.rooms.find(r => r.id === roomIdNum);
    if (!room) {
      toast.error("Select a vacant room first.");
      return;
    }

    const monthlyRentPaise = Math.max(0, Math.round(Number(onboardRentRupees || 0) * 100));
    const depositPaise = Math.max(0, Math.round(Number(onboardDepositRupees || 0) * 100));

    const services: Array<{
      serviceType: "tiffin" | "water_bottle" | "other";
      monthlyChargePaise: number;
      notes?: string;
    }> = [];
    if (onboardTiffinEnabled && Number(onboardTiffinRupees) > 0) {
      services.push({
        serviceType: "tiffin",
        monthlyChargePaise: Math.round(Number(onboardTiffinRupees) * 100),
      });
    }
    if (onboardWaterEnabled && Number(onboardWaterRupees) > 0) {
      services.push({
        serviceType: "water_bottle",
        monthlyChargePaise: Math.round(Number(onboardWaterRupees) * 100),
      });
    }
    if (onboardOtherEnabled && Number(onboardOtherRupees) > 0) {
      services.push({
        serviceType: "other",
        monthlyChargePaise: Math.round(Number(onboardOtherRupees) * 100),
        notes: onboardOtherNotes.trim() || undefined,
      });
    }

    try {
      // 1. Update Room Type / Capacity if modified inline
      const desiredCapacity = getCapacityForRoomType(onboardRoomType, Number(onboardRoomCapacity || room.capacity));
      if (room.roomType !== onboardRoomType || room.capacity !== desiredCapacity) {
        await updateRoom.mutateAsync({
          id: room.id,
          buildingId,
          floorId: room.floorId,
          number: room.number,
          roomType: onboardRoomType,
          capacity: desiredCapacity,
          billingMode: room.billingMode,
          airConditioning: room.airConditioning,
          balcony: room.balcony,
          imageUrl: room.imageUrl ?? undefined,
          defaultRentPaise: monthlyRentPaise > 0 ? monthlyRentPaise : room.defaultRentPaise,
        });
      }

      // 2. Create & Allocate New Tenant OR Allocate Existing Tenant
      if (onboardMode === "new_tenant") {
        await createTenantForRoom.mutateAsync({
          buildingId,
          roomId: room.id,
          tenant: {
            fullName: onboardFullName.trim(),
            phone: onboardPhone.trim(),
            password: onboardPassword,
          },
          allocation: {
            moveInDate: onboardMoveInDate,
            bedLabel: onboardBedLabel.trim() || undefined,
            isPrimaryPayer: onboardRoomType === "coliving" ? "yes" : "no",
            monthlyRentPaise,
            depositPaise,
          },
          services,
        });
      } else {
        const existingTenantIdNum = Number(selectedExistingTenantId);
        if (!existingTenantIdNum) {
          toast.error("Select an unallocated tenant.");
          return;
        }
        await allocateTenantWithServices.mutateAsync({
          buildingId,
          roomId: room.id,
          tenantId: existingTenantIdNum,
          moveInDate: onboardMoveInDate,
          bedLabel: onboardBedLabel.trim() || undefined,
          isPrimaryPayer: onboardRoomType === "coliving" ? "yes" : "no",
          monthlyRentPaise,
          depositPaise,
          services,
        });
      }

      await refresh();
      setShowOnboardPanel(false);
      setOnboardFullName("");
      setOnboardPhone("");
      setOnboardBedLabel("");
      toast.success(`Tenant allocated to Room ${room.number} with monthly billing ready`);
    } catch {
      // Handled by mutation onError
    }
  };

  const openSetupDrawer = (card: (typeof unifiedCards)[number]) => {
    if (expandedSetupAllocationId === card.allocation.id) {
      setExpandedSetupAllocationId(null);
      return;
    }
    setExpandedSetupAllocationId(card.allocation.id);
    setSetupRoomType(card.room.roomType as RoomTypeOption);
    setSetupDecidedRentRupees(String(Math.round(card.allocation.monthlyRentPaise / 100)));
    setSetupDepositRupees(String(Math.round(card.allocation.depositPaise / 100)));
  };

  const handleSaveRoomAndAllocationSetup = async (card: (typeof unifiedCards)[number]) => {
    const newRentPaise = Math.max(100, Math.round(Number(setupDecidedRentRupees || 0) * 100));
    const newDepositPaise = Math.max(0, Math.round(Number(setupDepositRupees || 0) * 100));
    const newCapacity = getCapacityForRoomType(setupRoomType, card.room.capacity);
    try {
      if (card.room.roomType !== setupRoomType || card.room.capacity !== newCapacity) {
        await updateRoom.mutateAsync({
          id: card.room.id,
          buildingId,
          floorId: card.room.floorId,
          number: card.room.number,
          roomType: setupRoomType,
          capacity: newCapacity,
          billingMode: card.room.billingMode,
          airConditioning: card.room.airConditioning,
          balcony: card.room.balcony,
          imageUrl: card.room.imageUrl ?? undefined,
          defaultRentPaise: newRentPaise,
        });
      }
      await updateAllocation.mutateAsync({
        id: card.allocation.id,
        buildingId,
        moveInDate: card.allocation.moveInDate,
        bedLabel: card.allocation.bedLabel ?? undefined,
        monthlyRentPaise: newRentPaise,
        depositPaise: newDepositPaise,
      });
      await refresh();
      setCardDrafts(prev => {
        const copy = { ...prev };
        delete copy[card.allocation.id];
        return copy;
      });
      toast.success(`Updated Room ${card.room.number} type & ${card.tenant.fullName}'s decided rent`);
    } catch {
      // Handled by mutation onError
    }
  };

  const submitUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const paidAmountPaise = Math.round(Number(form.get("paidAmount") || 0) * 100);
    if (selected.kind === "rent") {
      updateRent.mutate({
        id: selected.id,
        buildingId,
        expectedUpdatedAt: selected.updatedAt,
        dueDate: String(form.get("dueDate")),
        expectedAmountPaise: Math.round(Number(form.get("expectedAmount") || 0) * 100),
        paidAmountPaise,
        paidOn: String(form.get("paidOn")) || undefined,
        paymentMethod: String(form.get("paymentMethod")) as "cash" | "upi" | "bank_transfer",
        notes: String(form.get("notes")) || undefined,
      });
      return;
    }
    updateCharge.mutate({
      id: selected.id,
      buildingId,
      expectedUpdatedAt: selected.updatedAt,
      paidAmountPaise,
      paidOn: String(form.get("paidOn")) || undefined,
      paymentMethod: String(form.get("paymentMethod")) as "cash" | "upi" | "bank_transfer",
    });
  };

  const markPaid = (row: (typeof rows)[number]) => {
    const paidOn = todayIso();
    if (row.kind === "rent") {
      updateRent.mutate({
        id: row.id,
        buildingId,
        expectedUpdatedAt: row.updatedAt,
        dueDate: row.dueDate,
        expectedAmountPaise: row.expectedAmountPaise,
        paidAmountPaise: row.expectedAmountPaise,
        paidOn,
        paymentMethod: row.paymentMethod ?? "upi",
        notes: row.notes || "Marked paid by Manager",
      });
      return;
    }
    updateCharge.mutate({
      id: row.id,
      buildingId,
      expectedUpdatedAt: row.updatedAt,
      paidAmountPaise: row.expectedAmountPaise,
      paidOn,
      paymentMethod: row.paymentMethod ?? "upi",
    });
  };

  const removeRow = (row: (typeof rows)[number]) => {
    const label = row.kind === "rent" ? "rent record" : "tenant collection";
    deletionSafety.requestDelete({
      label,
      onConfirm: () => {
        if (row.kind === "rent") deleteRent.mutate({ id: row.id, buildingId });
        else deleteCharge.mutate({ id: row.id, buildingId });
      },
    });
  };

  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="All-in-one monthly desk"
        title="Collections, Onboarding & Meter Desk"
        description="Onboard tenants to vacant rooms, update decided rent & room types, and record monthly rent status alongside electric meter readings on a single screen."
        buildings={buildingsQuery.data}
        buildingId={buildingId}
        onBuildingChange={setBuildingId}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowOnboardPanel(prev => !prev)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              <UserPlus className="h-4 w-4" />
              {showOnboardPanel ? "Close Onboarding" : "+ New Tenant & Allocate Room"}
            </button>
            <button
              type="button"
              disabled={generateCycle.isPending}
              onClick={() => generateCycle.mutate({ buildingId, rentMonth: month })}
              className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-border bg-card px-3.5 text-sm font-semibold text-foreground transition hover:bg-muted/60 disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${generateCycle.isPending ? "animate-spin" : ""}`} />
              Sync {month} Cycle
            </button>
          </div>
        }
      />

      {/* Accurate Monthly Summary KPI Strip */}
      <section className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Rent Collected / Expected</p>
          <p className="mt-1.5 text-lg font-bold text-foreground sm:text-xl">
            {formatCurrency(monthSummary.rentPaid)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              / {formatCurrency(monthSummary.rentExpected)}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Pending: {formatCurrency(Math.max(monthSummary.rentExpected - monthSummary.rentPaid, 0))}
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Electricity Collected / Billed</p>
          <p className="mt-1.5 text-lg font-bold text-foreground sm:text-xl">
            {formatCurrency(monthSummary.elecPaid)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              / {formatCurrency(monthSummary.elecExpected)}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Rate: {formatCurrency(building.electricityRatePaise)} / unit
          </p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
          <p className="text-xs font-medium text-muted-foreground">Services & Assigned Costs</p>
          <p className="mt-1.5 text-lg font-bold text-foreground sm:text-xl">
            {formatCurrency(monthSummary.servicesPaid)}
            <span className="ml-1 text-xs font-normal text-muted-foreground">
              / {formatCurrency(monthSummary.servicesExpected)}
            </span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">Tiffin, water bottle & shared bills</p>
        </div>
        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-4 shadow-sm">
          <p className="text-xs font-semibold text-rose-800">Total Pending ({month})</p>
          <p className="mt-1.5 text-lg font-bold text-rose-700 sm:text-xl">
            {formatCurrency(monthSummary.totalPending)}
          </p>
          <p className="mt-1 text-xs text-rose-700/80">
            Total received: {formatCurrency(monthSummary.totalPaid)}
          </p>
        </div>
      </section>

      {/* Single-Tab New Tenant + Vacant Room Allocation + Room Type + Services Panel */}
      {showOnboardPanel ? (
        <form
          onSubmit={handleOnboardAndAllocate}
          className="mb-6 rounded-3xl border-2 border-primary/30 bg-primary/[0.03] p-4 shadow-md sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Single-Step Room Allocation & Setup
              </span>
              <h2 className="mt-1 text-base font-bold text-foreground sm:text-lg">
                Create or Select Tenant → Allocate Vacant Room → Set Decided Rent, Room Type & Services
              </h2>
            </div>
            <div className="flex rounded-xl border border-border bg-card p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setOnboardMode("new_tenant")}
                className={`rounded-lg px-3 py-1.5 transition ${
                  onboardMode === "new_tenant"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                New Tenant
              </button>
              <button
                type="button"
                onClick={() => setOnboardMode("existing_tenant")}
                className={`rounded-lg px-3 py-1.5 transition ${
                  onboardMode === "existing_tenant"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Unallocated Tenant ({unallocatedTenants.length})
              </button>
            </div>
          </div>

          {vacantRooms.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              All rooms in this building are currently full. Vacate a bed or increase room capacity on a card below.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Step 1: Choose Vacant Room & Room Type */}
              <div className="rounded-2xl border border-border/80 bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  1. Vacant Room & Room Type
                </p>
                <div className="mt-3 grid gap-3">
                  <label className="grid gap-1 text-xs font-semibold">
                    <span>Choose Vacant Room</span>
                    <select
                      required
                      value={selectedRoomId}
                      onChange={e => handleSelectOnboardRoom(e.target.value)}
                      className={fieldClass}
                    >
                      {vacantRooms.map(r => (
                        <option key={r.id} value={r.id}>
                          Room {r.number} ({r.availableBeds} of {r.capacity} bed{r.capacity === 1 ? "" : "s"} open ·{" "}
                          {ROOM_TYPE_LABELS[r.roomType as RoomTypeOption] ?? r.roomType})
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="grid gap-1 text-xs font-semibold">
                      <span>Room Type</span>
                      <select
                        value={onboardRoomType}
                        onChange={e => {
                          const nextType = e.target.value as RoomTypeOption;
                          setOnboardRoomType(nextType);
                          setOnboardRoomCapacity(
                            String(getCapacityForRoomType(nextType, Number(onboardRoomCapacity || 1))),
                          );
                        }}
                        className={fieldClass}
                      >
                        {(Object.keys(ROOM_TYPE_LABELS) as RoomTypeOption[]).map(typeKey => (
                          <option key={typeKey} value={typeKey}>
                            {ROOM_TYPE_LABELS[typeKey]}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-1 text-xs font-semibold">
                      <span>Bed / Label (optional)</span>
                      <input
                        value={onboardBedLabel}
                        onChange={e => setOnboardBedLabel(e.target.value)}
                        placeholder="e.g. Bed A"
                        className={fieldClass}
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="grid gap-1 text-xs font-semibold">
                      <span>Decided Rent (₹/mo)</span>
                      <input
                        required
                        type="number"
                        min="0"
                        value={onboardRentRupees}
                        onChange={e => setOnboardRentRupees(e.target.value)}
                        className={fieldClass}
                      />
                    </label>
                    <label className="grid gap-1 text-xs font-semibold">
                      <span>Deposit (₹)</span>
                      <input
                        type="number"
                        min="0"
                        value={onboardDepositRupees}
                        onChange={e => setOnboardDepositRupees(e.target.value)}
                        className={fieldClass}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Step 2: Tenant Profile */}
              <div className="rounded-2xl border border-border/80 bg-card p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  2. Tenant Details & Move-In
                </p>
                <div className="mt-3 grid gap-3">
                  {onboardMode === "new_tenant" ? (
                    <>
                      <label className="grid gap-1 text-xs font-semibold">
                        <span>Tenant Full Name</span>
                        <input
                          required
                          value={onboardFullName}
                          onChange={e => setOnboardFullName(e.target.value)}
                          placeholder="Enter full name"
                          className={fieldClass}
                        />
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="grid gap-1 text-xs font-semibold">
                          <span>Mobile Number</span>
                          <input
                            required
                            value={onboardPhone}
                            onChange={e => setOnboardPhone(e.target.value)}
                            placeholder="10-digit mobile"
                            className={fieldClass}
                          />
                        </label>
                        <label className="grid gap-1 text-xs font-semibold">
                          <span>Portal Password</span>
                          <input
                            required
                            minLength={8}
                            value={onboardPassword}
                            onChange={e => setOnboardPassword(e.target.value)}
                            className={fieldClass}
                          />
                        </label>
                      </div>
                    </>
                  ) : (
                    <label className="grid gap-1 text-xs font-semibold">
                      <span>Select Unallocated Tenant</span>
                      <select
                        required
                        value={selectedExistingTenantId}
                        onChange={e => setSelectedExistingTenantId(e.target.value)}
                        className={fieldClass}
                      >
                        <option value="">Choose tenant…</option>
                        {unallocatedTenants.map(t => (
                          <option key={t.id} value={t.id}>
                            {t.fullName} · {t.phone}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  <label className="grid gap-1 text-xs font-semibold">
                    <span>Move-In Date</span>
                    <input
                      required
                      type="date"
                      value={onboardMoveInDate}
                      onChange={e => setOnboardMoveInDate(e.target.value)}
                      className={fieldClass}
                    />
                  </label>
                </div>
              </div>

              {/* Step 3: Monthly Services (Tiffin, Water, Other) */}
              <div className="rounded-2xl border border-border/80 bg-card p-4 sm:col-span-2 lg:col-span-1">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  3. Optional Monthly Services
                </p>
                <div className="mt-3 grid gap-2.5">
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-border/70 p-2.5">
                    <label className="flex items-center gap-2 text-xs font-semibold">
                      <input
                        type="checkbox"
                        checked={onboardTiffinEnabled}
                        onChange={e => setOnboardTiffinEnabled(e.target.checked)}
                        className="h-4 w-4 accent-primary"
                      />
                      Tiffin Service (₹/mo)
                    </label>
                    {onboardTiffinEnabled ? (
                      <input
                        type="number"
                        min="1"
                        value={onboardTiffinRupees}
                        onChange={e => setOnboardTiffinRupees(e.target.value)}
                        className="h-9 w-24 rounded-lg border border-border px-2 text-right text-xs font-semibold"
                      />
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-border/70 p-2.5">
                    <label className="flex items-center gap-2 text-xs font-semibold">
                      <input
                        type="checkbox"
                        checked={onboardWaterEnabled}
                        onChange={e => setOnboardWaterEnabled(e.target.checked)}
                        className="h-4 w-4 accent-primary"
                      />
                      Water Bottle (₹/mo)
                    </label>
                    {onboardWaterEnabled ? (
                      <input
                        type="number"
                        min="1"
                        value={onboardWaterRupees}
                        onChange={e => setOnboardWaterRupees(e.target.value)}
                        className="h-9 w-24 rounded-lg border border-border px-2 text-right text-xs font-semibold"
                      />
                    ) : null}
                  </div>
                  <div className="rounded-xl border border-border/70 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <label className="flex items-center gap-2 text-xs font-semibold">
                        <input
                          type="checkbox"
                          checked={onboardOtherEnabled}
                          onChange={e => setOnboardOtherEnabled(e.target.checked)}
                          className="h-4 w-4 accent-primary"
                        />
                        Other Service (₹/mo)
                      </label>
                      {onboardOtherEnabled ? (
                        <input
                          type="number"
                          min="1"
                          value={onboardOtherRupees}
                          onChange={e => setOnboardOtherRupees(e.target.value)}
                          className="h-9 w-24 rounded-lg border border-border px-2 text-right text-xs font-semibold"
                        />
                      ) : null}
                    </div>
                    {onboardOtherEnabled ? (
                      <input
                        value={onboardOtherNotes}
                        onChange={e => setOnboardOtherNotes(e.target.value)}
                        placeholder="Service description (e.g. Laundry, Wi-Fi)"
                        className="mt-2 h-9 w-full rounded-lg border border-border px-2.5 text-xs"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}

          {vacantRooms.length > 0 ? (
            <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowOnboardPanel(false)}
                className="h-11 rounded-xl border border-border bg-card px-4 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  createTenantForRoom.isPending ||
                  allocateTenantWithServices.isPending ||
                  updateRoom.isPending
                }
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm disabled:opacity-60"
              >
                <UserPlus className="h-4 w-4" />
                {createTenantForRoom.isPending || allocateTenantWithServices.isPending
                  ? "Saving & Allocating…"
                  : "Save Tenant, Allocate Room & Generate Bill"}
              </button>
            </div>
          ) : null}
        </form>
      ) : null}

      {/* Filter & Search Bar (Mobile-Friendly) */}
      <section className="mb-5 grid gap-3 rounded-3xl border border-border/70 bg-card p-4 shadow-[0_10px_28px_rgba(23,43,77,0.05)] sm:grid-cols-2 lg:grid-cols-4">
        <label className="grid gap-1 text-sm font-medium">
          <span>Billing month</span>
          <input
            type="month"
            value={month}
            onChange={event => {
              setMonth(event.target.value || monthNow());
              setCardDrafts({});
            }}
            className={fieldClass}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          <span className="flex items-center gap-1">
            <Search className="h-3.5 w-3.5" /> Search Room or Tenant
          </span>
          <input
            value={searchQuery}
            onChange={event => setSearchQuery(event.target.value)}
            placeholder="Room #, name, or mobile…"
            className={fieldClass}
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          <span className="flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Status Filter
          </span>
          <select
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value as typeof statusFilter)}
            className={fieldClass}
          >
            <option value="all">All statuses ({activeAllocations.length})</option>
            <option value="pending">Unpaid / Pending</option>
            <option value="partial">Partial Paid</option>
            <option value="paid">Fully Paid</option>
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => setShowLegacyLedger(prev => !prev)}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-3 text-xs font-semibold text-foreground transition hover:bg-muted"
          >
            <ReceiptIndianRupee className="h-4 w-4 text-primary" />
            {showLegacyLedger ? "Hide Itemized Ledger Rows" : `Show Itemized Ledger (${rows.length})`}
          </button>
        </div>
      </section>

      {/* Primary Mobile-Friendly Unified Room & Tenant Monthly Cards */}
      <section className="space-y-4">
        {unifiedCards.length === 0 ? (
          <div className="rounded-3xl border border-border/70 bg-card p-8 text-center shadow-sm">
            <p className="text-base font-semibold text-foreground">
              No active tenant rooms match this filter for {month}.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Tap &ldquo;+ New Tenant &amp; Allocate Room&rdquo; above to onboard a tenant into a vacant room.
            </p>
          </div>
        ) : (
          unifiedCards.map(card => {
            const draft = getDraftForCard(card);
            const prevUnits = Math.max(0, Math.round(Number(draft.prevReading || 0)));
            const hasCurr = draft.currReading.trim() !== "";
            const currUnits = hasCurr ? Math.max(0, Math.round(Number(draft.currReading || 0))) : prevUnits;
            const consumedUnits = Math.max(0, currUnits - prevUnits);
            const liveElecBillPaise = hasCurr
              ? consumedUnits * building.electricityRatePaise
              : card.roomElectricityBill?.billAmountPaise ?? 0;
            const liveElecBillRupees = Math.round(liveElecBillPaise / 100);
            const isSetupOpen = expandedSetupAllocationId === card.allocation.id;
            const isSaving = savingAllocationId === card.allocation.id;

            const whatsappUrl = buildWhatsAppShareUrl(
              card.tenant.phone,
              buildReminderShareMessage(
                building,
                `Rent & utility balance (${formatCurrency(card.totalPendingPaise)}) · ${month}`,
                draft.dueDate,
                card.tenant.fullName,
              ),
            );

            return (
              <article
                key={card.allocation.id}
                className="overflow-hidden rounded-3xl border border-border/80 bg-card shadow-[0_10px_28px_rgba(23,43,77,0.05)]"
              >
                {/* Top Banner: Tenant, Room, Total Balance & Quick Setup Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-muted/25 px-4 py-3.5 sm:px-6">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                      <BedDouble className="h-3.5 w-3.5" />
                      Room {card.room.number}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-foreground">{card.tenant.fullName}</h3>
                        <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                          {ROOM_TYPE_LABELS[card.room.roomType as RoomTypeOption] ?? card.room.roomType}
                          {card.floor ? ` · ${card.floor.name}` : ""}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold capitalize ${
                            card.overallStatus === "paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : card.overallStatus === "partial"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {card.overallStatus === "pending" ? "Unpaid" : card.overallStatus}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Phone: {card.tenant.phone} · Decided Rent:{" "}
                        <strong className="text-foreground">
                          {formatCurrency(card.allocation.monthlyRentPaise)}/mo
                        </strong>
                        {card.services.length > 0
                          ? ` · ${card.services.length} active service${card.services.length === 1 ? "" : "s"}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className="rounded-xl border border-border/70 bg-background px-3 py-1.5 text-right">
                      <p className="text-[11px] text-muted-foreground">Month Paid / Total Due</p>
                      <p className="text-sm font-bold text-foreground">
                        {formatCurrency(card.totalPaidPaise)}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          / {formatCurrency(card.totalExpectedPaise)}
                        </span>
                      </p>
                    </div>
                    {whatsappUrl && card.totalPendingPaise > 0 ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => openSetupDrawer(card)}
                      className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground transition hover:bg-muted"
                    >
                      <Settings2 className="h-3.5 w-3.5 text-primary" />
                      Rent, Room Type & Services
                      {isSetupOpen ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Collapsible Drawer: Edit Decided Rent, Room Type & Recurring Services without leaving tab */}
                {isSetupOpen ? (
                  <div className="border-b border-border/70 bg-primary/[0.03] px-4 py-4 sm:px-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      {/* Left: Room Type & Decided Monthly Rent */}
                      <div className="rounded-2xl border border-border/80 bg-card p-3.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                          Update Room Type & Decided Rent
                        </p>
                        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                          <label className="grid gap-1 text-xs font-semibold">
                            <span>Room Type</span>
                            <select
                              value={setupRoomType}
                              onChange={e => setSetupRoomType(e.target.value as RoomTypeOption)}
                              className={fieldClass}
                            >
                              {(Object.keys(ROOM_TYPE_LABELS) as RoomTypeOption[]).map(typeKey => (
                                <option key={typeKey} value={typeKey}>
                                  {ROOM_TYPE_LABELS[typeKey]}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="grid gap-1 text-xs font-semibold">
                            <span>Decided Rent (₹/mo)</span>
                            <input
                              type="number"
                              min="1"
                              value={setupDecidedRentRupees}
                              onChange={e => setSetupDecidedRentRupees(e.target.value)}
                              className={fieldClass}
                            />
                          </label>
                          <label className="grid gap-1 text-xs font-semibold">
                            <span>Security Deposit (₹)</span>
                            <input
                              type="number"
                              min="0"
                              value={setupDepositRupees}
                              onChange={e => setSetupDepositRupees(e.target.value)}
                              className={fieldClass}
                            />
                          </label>
                        </div>
                        <button
                          type="button"
                          disabled={updateRoom.isPending || updateAllocation.isPending}
                          onClick={() => void handleSaveRoomAndAllocationSetup(card)}
                          className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground disabled:opacity-60"
                        >
                          Save Room Type & Decided Rent
                        </button>
                      </div>

                      {/* Right: Manage Recurring Monthly Services (Tiffin, Water, Other) */}
                      <div className="rounded-2xl border border-border/80 bg-card p-3.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                          Recurring Monthly Services (Tiffin / Water / Other)
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {card.services.length === 0 ? (
                            <span className="text-xs text-muted-foreground">
                              No active recurring services attached yet.
                            </span>
                          ) : (
                            card.services.map(service => (
                              <span
                                key={service.id}
                                className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-1.5 text-xs font-semibold"
                              >
                                {service.serviceType === "tiffin"
                                  ? "Tiffin"
                                  : service.serviceType === "water_bottle"
                                    ? "Water Bottle"
                                    : service.notes || "Other"}{" "}
                                · {formatCurrency(service.monthlyChargePaise)}/mo
                                <button
                                  type="button"
                                  onClick={() =>
                                    deleteTenantService.mutate({
                                      id: service.id,
                                      buildingId,
                                      tenantId: card.tenant.id,
                                    })
                                  }
                                  className="text-rose-600 hover:underline"
                                >
                                  Remove
                                </button>
                              </span>
                            ))
                          )}
                        </div>
                        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                          <select
                            value={setupNewServiceType}
                            onChange={e =>
                              setSetupNewServiceType(
                                e.target.value as "tiffin" | "water_bottle" | "other",
                              )
                            }
                            className="h-10 rounded-xl border border-border bg-background px-2.5 text-xs font-semibold"
                          >
                            <option value="tiffin">Tiffin Service</option>
                            <option value="water_bottle">Water Bottle</option>
                            <option value="other">Other Service</option>
                          </select>
                          <input
                            type="number"
                            min="1"
                            value={setupNewServiceRupees}
                            onChange={e => setSetupNewServiceRupees(e.target.value)}
                            placeholder="Monthly ₹"
                            className="h-10 rounded-xl border border-border bg-background px-2.5 text-xs"
                          />
                          <button
                            type="button"
                            disabled={createTenantService.isPending}
                            onClick={() =>
                              createTenantService.mutate({
                                buildingId,
                                tenantId: card.tenant.id,
                                serviceType: setupNewServiceType,
                                monthlyChargePaise: Math.max(
                                  100,
                                  Math.round(Number(setupNewServiceRupees || 0) * 100),
                                ),
                                notes: setupNewServiceNotes.trim() || undefined,
                              })
                            }
                            className="inline-flex h-10 items-center justify-center gap-1 rounded-xl border border-primary/30 bg-primary/10 px-3 text-xs font-semibold text-primary"
                          >
                            <Plus className="h-3.5 w-3.5" /> Add Service
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* Main Card Body: Side-by-Side Monthly Rent Status + Electricity Meter & Bill */}
                <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
                  {/* Block 1: Monthly Rent Status (Paid / Partial / Unpaid) */}
                  <div className="rounded-2xl border border-border/70 bg-muted/15 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CircleDollarSign className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-bold text-foreground">
                          1. Monthly Rent ({month})
                        </h4>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
                          draft.rentStatus === "paid"
                            ? "bg-emerald-100 text-emerald-800"
                            : draft.rentStatus === "partial"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {draft.rentStatus === "pending" ? "Unpaid" : draft.rentStatus}
                      </span>
                    </div>

                    {/* 1-Tap Rent Status Selector Buttons */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickRentStatus(card, "paid")}
                        className={`h-10 rounded-xl border text-xs font-bold transition ${
                          draft.rentStatus === "paid"
                            ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                            : "border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100"
                        }`}
                      >
                        Paid (Full)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickRentStatus(card, "partial")}
                        className={`h-10 rounded-xl border text-xs font-bold transition ${
                          draft.rentStatus === "partial"
                            ? "border-amber-500 bg-amber-500 text-white shadow-sm"
                            : "border-amber-200 bg-amber-50/70 text-amber-800 hover:bg-amber-100"
                        }`}
                      >
                        Partial Paid
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickRentStatus(card, "pending")}
                        className={`h-10 rounded-xl border text-xs font-bold transition ${
                          draft.rentStatus === "pending"
                            ? "border-rose-600 bg-rose-600 text-white shadow-sm"
                            : "border-rose-200 bg-rose-50/70 text-rose-800 hover:bg-rose-100"
                        }`}
                      >
                        Unpaid
                      </button>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      <label className="grid gap-1 text-xs font-semibold">
                        <span>Decided Rent (₹)</span>
                        <input
                          type="number"
                          min="0"
                          value={draft.expectedRentRupees}
                          onChange={e => {
                            const nextExpected = e.target.value;
                            updateCardDraft(card, {
                              expectedRentRupees: nextExpected,
                              ...(draft.rentStatus === "paid" ? { rentPaidRupees: nextExpected } : {}),
                            });
                          }}
                          className={fieldClass}
                        />
                      </label>
                      <label className="grid gap-1 text-xs font-semibold">
                        <span>Rent Paid (₹)</span>
                        <input
                          type="number"
                          min="0"
                          value={draft.rentPaidRupees}
                          onChange={e => {
                            const paidVal = Number(e.target.value || 0);
                            const expVal = Number(draft.expectedRentRupees || 0);
                            const nextStatus: QuickRentStatus =
                              paidVal <= 0 ? "pending" : paidVal >= expVal ? "paid" : "partial";
                            updateCardDraft(card, {
                              rentPaidRupees: e.target.value,
                              rentStatus: nextStatus,
                            });
                          }}
                          className={fieldClass}
                        />
                      </label>
                      <label className="col-span-2 grid gap-1 text-xs font-semibold sm:col-span-1">
                        <span>Payment Mode</span>
                        <select
                          value={draft.paymentMethod}
                          onChange={e =>
                            updateCardDraft(card, {
                              paymentMethod: e.target.value as PaymentMethodOption,
                            })
                          }
                          className={fieldClass}
                        >
                          <option value="upi">UPI</option>
                          <option value="cash">Cash</option>
                          <option value="bank_transfer">Bank transfer</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  {/* Block 2: Monthly Electricity Meter Reading & Bill Status */}
                  <div className="rounded-2xl border border-border/70 bg-muted/15 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-bold text-foreground">
                          2. Room {card.room.number} Electric Meter & Bill
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {hasCurr ? (
                          <>
                            {consumedUnits} units ={" "}
                            <strong className="text-foreground">
                              {formatCurrency(liveElecBillPaise)}
                            </strong>
                            {card.roomOccupantCount > 1
                              ? ` (${formatCurrency(Math.round(liveElecBillPaise / card.roomOccupantCount))}/tenant)`
                              : ""}
                          </>
                        ) : (
                          "Enter meter units below"
                        )}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      <label className="grid gap-1 text-xs font-semibold">
                        <span>Prev Reading</span>
                        <input
                          type="number"
                          min="0"
                          value={draft.prevReading}
                          onChange={e => updateCardDraft(card, { prevReading: e.target.value })}
                          className={fieldClass}
                        />
                      </label>
                      <label className="grid gap-1 text-xs font-semibold">
                        <span>Current Reading</span>
                        <input
                          type="number"
                          min="0"
                          placeholder="Enter units"
                          value={draft.currReading}
                          onChange={e => {
                            const nextCurr = e.target.value;
                            const nextUnits = Math.max(
                              0,
                              Math.round(Number(nextCurr || 0)) - prevUnits,
                            );
                            const nextBillRupees = Math.round(
                              (nextUnits * building.electricityRatePaise) / 100,
                            );
                            updateCardDraft(card, {
                              currReading: nextCurr,
                              ...(draft.elecStatus === "paid"
                                ? { elecPaidRupees: String(nextBillRupees) }
                                : {}),
                            });
                          }}
                          className={fieldClass}
                        />
                      </label>
                      <label className="col-span-2 grid gap-1 text-xs font-semibold sm:col-span-1">
                        <span>Bill Paid (₹)</span>
                        <input
                          type="number"
                          min="0"
                          value={draft.elecPaidRupees}
                          onChange={e => {
                            const paidVal = Number(e.target.value || 0);
                            const nextStatus: QuickRentStatus =
                              paidVal <= 0
                                ? "pending"
                                : paidVal >= liveElecBillRupees && liveElecBillRupees > 0
                                  ? "paid"
                                  : "partial";
                            updateCardDraft(card, {
                              elecPaidRupees: e.target.value,
                              elecStatus: nextStatus,
                            });
                          }}
                          className={fieldClass}
                        />
                      </label>
                    </div>

                    {/* 1-Tap Electricity Bill Status Buttons */}
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickElecStatus(card, "paid", liveElecBillRupees)}
                        className={`h-9 rounded-xl border text-xs font-bold transition ${
                          draft.elecStatus === "paid"
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100"
                        }`}
                      >
                        Bill Paid
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickElecStatus(card, "partial", liveElecBillRupees)}
                        className={`h-9 rounded-xl border text-xs font-bold transition ${
                          draft.elecStatus === "partial"
                            ? "border-amber-500 bg-amber-500 text-white"
                            : "border-amber-200 bg-amber-50/70 text-amber-800 hover:bg-amber-100"
                        }`}
                      >
                        Partial Paid
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickElecStatus(card, "pending", liveElecBillRupees)}
                        className={`h-9 rounded-xl border text-xs font-bold transition ${
                          draft.elecStatus === "pending"
                            ? "border-rose-600 bg-rose-600 text-white"
                            : "border-rose-200 bg-rose-50/70 text-rose-800 hover:bg-rose-100"
                        }`}
                      >
                        Unpaid
                      </button>
                    </div>
                  </div>
                </div>

                {/* Optional Services / Extra Charges Row for this Tenant */}
                {card.otherCharges.length > 0 ? (
                  <div className="border-t border-border/60 bg-muted/10 px-4 py-3 sm:px-6">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Monthly Service & Assigned Charges:
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {card.otherCharges.map(charge => (
                        <div
                          key={charge.id}
                          className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-xs"
                        >
                          <span className="font-semibold">{charge.title}</span>
                          <span className="text-muted-foreground">
                            {formatCurrency(charge.paidAmountPaise)} /{" "}
                            {formatCurrency(charge.expectedAmountPaise)}
                          </span>
                          {charge.status !== "paid" ? (
                            <button
                              type="button"
                              onClick={() =>
                                updateCharge.mutate({
                                  id: charge.id,
                                  buildingId,
                                  expectedUpdatedAt: charge.updatedAt,
                                  paidAmountPaise: charge.expectedAmountPaise,
                                  paidOn: todayIso(),
                                  paymentMethod: draft.paymentMethod,
                                })
                              }
                              className="rounded-lg bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800"
                            >
                              Mark Paid
                            </button>
                          ) : (
                            <span className="rounded-lg bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700">
                              Paid
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Unified Single-Click Footer Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 bg-muted/20 px-4 py-3 sm:px-6">
                  <p className="text-xs text-muted-foreground">
                    Updates rent status and Room {card.room.number} electric meter reading together in one click.
                  </p>
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => void handleSaveUnifiedCard(card)}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:opacity-60 sm:w-auto"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isSaving
                      ? "Saving Monthly Update…"
                      : "Save Monthly Rent & Electricity"}
                  </button>
                </div>
              </article>
            );
          })
        )}
      </section>

      {/* Itemized Ledger Section (Preserves audit deletion & individual row editing) */}
      {selected ? (
        <form
          onSubmit={submitUpdate}
          className="mt-6 grid gap-3 rounded-3xl border border-primary/25 bg-primary/[0.04] p-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <p className="text-sm font-semibold">Update {selected.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {selected.tenantName}
              {selected.room ? ` · Room ${selected.room}` : ""} · Due {selected.dueDate}
            </p>
          </div>
          {selected.kind === "rent" ? (
            <>
              <label className="grid gap-1 text-sm font-medium">
                Expected amount (₹)
                <input
                  required
                  name="expectedAmount"
                  inputMode="decimal"
                  defaultValue={selected.expectedAmountPaise / 100}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1 text-sm font-medium">
                Due date
                <input
                  required
                  name="dueDate"
                  type="date"
                  defaultValue={selected.dueDate}
                  className={fieldClass}
                />
              </label>
            </>
          ) : (
            <div className="rounded-2xl bg-card px-3 py-2 text-sm">
              <p className="text-xs text-muted-foreground">Tenant share due</p>
              <p className="mt-1 font-semibold">{formatCurrency(selected.expectedAmountPaise)}</p>
            </div>
          )}
          <label className="grid gap-1 text-sm font-medium">
            Total received (₹)
            <input
              required
              name="paidAmount"
              min="0"
              max={selected.expectedAmountPaise / 100}
              inputMode="decimal"
              defaultValue={selected.paidAmountPaise / 100}
              className={fieldClass}
            />
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Payment method
            <select
              name="paymentMethod"
              defaultValue={selected.paymentMethod ?? "upi"}
              className={fieldClass}
            >
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
              <option value="bank_transfer">Bank transfer</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-medium">
            Payment date
            <input
              name="paidOn"
              type="date"
              defaultValue={selected.paidOn ?? ""}
              className={fieldClass}
            />
          </label>
          {selected.kind === "rent" ? (
            <label className="grid gap-1 text-sm font-medium">
              Collection note
              <input
                name="notes"
                defaultValue={selected.notes ?? ""}
                className={fieldClass}
                placeholder="Reference or follow-up note"
              />
            </label>
          ) : null}
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={updateRent.isPending || updateCharge.isPending}
              className="h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-60"
            >
              {updateRent.isPending || updateCharge.isPending ? "Saving…" : "Save status update"}
            </button>
            <button
              type="button"
              onClick={() => setEditor(null)}
              className="h-11 rounded-xl border border-border bg-card px-4 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {showLegacyLedger ? (
        <section className="mt-6 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-[0_10px_28px_rgba(23,43,77,0.05)]">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-center gap-2">
              <ReceiptIndianRupee className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold">Itemized tenant-wise ledger</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Individual rent, electricity share, and service rows. Delete is available for rent and unpaid tenant charges; paid collections remain correctable for audit safety.
            </p>
          </div>
          <div className="divide-y divide-border/70">
            {rows.length === 0 ? (
              <p className="p-7 text-center text-sm text-muted-foreground">
                No collections match these filters.
              </p>
            ) : (
              rows.map(row => {
                const canDelete = row.kind === "rent" || row.paidAmountPaise === 0;
                return (
                  <div
                    key={row.key}
                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">
                        {row.tenantName}{" "}
                        <span className="font-normal text-muted-foreground">· {row.title}</span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {row.room ? `Room ${row.room} · ` : ""}Due {row.dueDate}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
                      <div className="text-right">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                            row.status === "paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : row.status === "partial"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {row.status}
                        </span>
                        <p className="mt-2 text-sm font-semibold">
                          {formatCurrency(row.paidAmountPaise)}{" "}
                          <span className="text-xs font-normal text-muted-foreground">
                            / {formatCurrency(row.expectedAmountPaise)}
                          </span>
                        </p>
                      </div>
                      {row.status !== "paid" ? (
                        <button
                          type="button"
                          disabled={updateRent.isPending || updateCharge.isPending}
                          onClick={() => markPaid(row)}
                          className="inline-flex h-10 items-center rounded-xl border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800 disabled:opacity-60"
                        >
                          Mark paid
                        </button>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => setEditor(row.key)}
                        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-primary/25 bg-primary/[0.04] px-3 text-xs font-semibold text-primary"
                      >
                        <CircleDollarSign className="h-3.5 w-3.5" />
                        Update
                      </button>
                      {canDelete ? (
                        <button
                          type="button"
                          disabled={deleteRent.isPending || deleteCharge.isPending}
                          onClick={() => removeRow(row)}
                          className="inline-flex h-10 items-center rounded-xl border border-rose-200 bg-rose-50 px-3 text-xs font-semibold text-rose-700 disabled:opacity-60"
                        >
                          Delete
                        </button>
                      ) : (
                        <span className="max-w-24 text-right text-[11px] leading-4 text-muted-foreground">
                          Correct paid entry
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
