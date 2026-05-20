export type LogLevel = "info" | "success" | "warn" | "error";
export type AgentKey = "System" | "IntentAgent" | "DiscoveryAgent" | "RankingAgent" | "BookingAgent";

export type TraceLine = {
  t: string;
  agent: AgentKey;
  msg: string;
  level: LogLevel;
};

export type WorkflowRun = {
  id: string;
  query: string;
  language: "Urdu" | "English" | "Urdu/Hindi (Roman)";
  intent: string;
  location: string;
  time: string;
  status: "success" | "failure";
  bookingId?: string;
  provider?: string;
  rating?: number;
  failureReason?: string;
  startedAt: string;
  durationMs: number;
  trace: TraceLine[];
};

const L = (t: string, agent: AgentKey, msg: string, level: LogLevel = "info"): TraceLine => ({ t, agent, msg, level });

export const runs: WorkflowRun[] = [
  {
    id: "WF-1042",
    query: "Mujhe kal subah G-13 mein AC technician chahiye",
    language: "Urdu/Hindi (Roman)",
    intent: "AC Technician",
    location: "G-13",
    time: "Tomorrow morning",
    status: "success",
    bookingId: "BK-90952",
    provider: "Ali AC Services",
    rating: 4.8,
    startedAt: "2026-05-17 03:45:00",
    durationMs: 5000,
    trace: [
      L("03:45:00", "System", 'Processing: "Mujhe kal subah G-13 mein AC technician chahiye"'),
      L("03:45:01", "IntentAgent", "Parsing query…"),
      L("03:45:01", "IntentAgent", "Language → Urdu/Hindi (Roman)"),
      L("03:45:01", "IntentAgent", "Intent → AC Technician (intent_keywords.json)", "success"),
      L("03:45:01", "IntentAgent", "Location → G-13"),
      L("03:45:01", "IntentAgent", 'Time → morning  ("kal subah")'),
      L("03:45:02", "DiscoveryAgent", "Reading providers_mock_db.json"),
      L("03:45:02", "DiscoveryAgent", "service=ac_technician → p1, p2, p3"),
      L("03:45:02", "DiscoveryAgent", "location=G-13 → p1, p3", "success"),
      L("03:45:03", "RankingAgent", "Evaluating availability for: morning"),
      L("03:45:03", "RankingAgent", "p1 Ali AC Services [morning, afternoon] ✓", "success"),
      L("03:45:03", "RankingAgent", "p3 G-13 AC Experts [evening] ✗", "warn"),
      L("03:45:03", "RankingAgent", "Top pick → p1 (rating 4.8)", "success"),
      L("03:45:04", "BookingAgent", "Initiating booking for p1"),
      L("03:45:04", "BookingAgent", "Params: G-13 · Tomorrow morning"),
      L("03:45:04", "BookingAgent", "Booking ID → BK-90952", "success"),
      L("03:45:04", "BookingAgent", "Persisting to bookings.json"),
      L("03:45:05", "BookingAgent", "Receipt generated → booking_receipt.txt"),
      L("03:45:05", "System", "Workflow completed successfully.", "success"),
    ],
  },
  {
    id: "WF-1043",
    query: "I need a plumber tomorrow afternoon in F-7",
    language: "English",
    intent: "Plumber",
    location: "F-7",
    time: "Tomorrow afternoon",
    status: "failure",
    failureReason: "No provider found in F-7",
    startedAt: "2026-05-17 23:15:00",
    durationMs: 5000,
    trace: [
      L("23:15:00", "System", 'Processing: "I need a plumber tomorrow afternoon in F-7"'),
      L("23:15:01", "IntentAgent", "Parsing query…"),
      L("23:15:01", "IntentAgent", "Language → English"),
      L("23:15:01", "IntentAgent", "Intent → Plumber", "success"),
      L("23:15:01", "IntentAgent", "Location → F-7"),
      L("23:15:01", "IntentAgent", "Time → Tomorrow afternoon"),
      L("23:15:02", "DiscoveryAgent", "service=plumber → p4"),
      L("23:15:02", "DiscoveryAgent", "location=F-7 → none", "warn"),
      L("23:15:03", "RankingAgent", "No candidates to rank.", "warn"),
      L("23:15:04", "BookingAgent", "Booking failed — no provider in F-7.", "error"),
      L("23:15:05", "System", "Workflow completed with failure.", "error"),
    ],
  },
  {
    id: "WF-1044",
    query: "مجھے آج شام G-9 میں الیکٹریشن چاہیے",
    language: "Urdu",
    intent: "Electrician",
    location: "G-9",
    time: "Today evening",
    status: "failure",
    failureReason: "No electrician in G-9",
    startedAt: "2026-05-17 23:35:00",
    durationMs: 5000,
    trace: [
      L("23:35:00", "System", 'Processing: "مجھے آج شام G-9 میں الیکٹریشن چاہیے"'),
      L("23:35:01", "IntentAgent", "Parsing query…"),
      L("23:35:01", "IntentAgent", "Language → Urdu"),
      L("23:35:01", "IntentAgent", "Intent → Electrician", "success"),
      L("23:35:01", "IntentAgent", "Location → G-9"),
      L("23:35:01", "IntentAgent", 'Time → evening  ("آج شام")'),
      L("23:35:02", "DiscoveryAgent", "service=electrician → none", "warn"),
      L("23:35:03", "RankingAgent", "No candidates to rank.", "warn"),
      L("23:35:04", "BookingAgent", "Booking failed — no provider in G-9.", "error"),
      L("23:35:05", "System", "Workflow completed with failure.", "error"),
    ],
  },
  {
    id: "WF-1045",
    query: "I need a plumber tomorrow afternoon in F-7  (re-run)",
    language: "English",
    intent: "Plumber",
    location: "F-7",
    time: "Tomorrow afternoon",
    status: "success",
    bookingId: "BK-90953",
    provider: "Raza Plumbing F-7",
    rating: 4.5,
    startedAt: "2026-05-17 23:45:00",
    durationMs: 5000,
    trace: [
      L("23:45:00", "System", "Re-running plumber request after DB sync."),
      L("23:45:01", "IntentAgent", "Intent → Plumber · Location → F-7 · Time → afternoon", "success"),
      L("23:45:02", "DiscoveryAgent", "service=plumber → p4, PRV015"),
      L("23:45:02", "DiscoveryAgent", "location=F-7 → PRV015", "success"),
      L("23:45:03", "RankingAgent", "PRV015 Raza Plumbing F-7 [morning, afternoon] ✓", "success"),
      L("23:45:03", "RankingAgent", "Top pick → PRV015 (rating 4.5)", "success"),
      L("23:45:04", "BookingAgent", "Booking ID → BK-90953", "success"),
      L("23:45:04", "BookingAgent", "Persisted to bookings.json"),
      L("23:45:05", "BookingAgent", "Receipt generated."),
      L("23:45:05", "System", "Workflow completed successfully.", "success"),
    ],
  },
  {
    id: "WF-1046",
    query: "مجھے آج شام G-9 میں الیکٹریشن چاہیے  (re-run)",
    language: "Urdu",
    intent: "Electrician",
    location: "G-9",
    time: "Today evening",
    status: "failure",
    failureReason: "PRV016 unavailable in evening slot",
    startedAt: "2026-05-17 23:45:10",
    durationMs: 5000,
    trace: [
      L("23:45:10", "System", "Re-running electrician request."),
      L("23:45:11", "IntentAgent", "Intent → Electrician · Location → G-9 · Time → evening", "success"),
      L("23:45:12", "DiscoveryAgent", "service=electrician → PRV016"),
      L("23:45:12", "DiscoveryAgent", "location=G-9 → PRV016", "success"),
      L("23:45:13", "RankingAgent", "PRV016 Kareem Electric G-9 [08–10, 14–15] ✗ evening", "warn"),
      L("23:45:13", "RankingAgent", "No candidates after time filter.", "warn"),
      L("23:45:14", "BookingAgent", "Booking failed — no evening slot.", "error"),
      L("23:45:15", "System", "Workflow completed with failure.", "error"),
    ],
  },
];

export const stats = {
  total: runs.length,
  success: runs.filter((r) => r.status === "success").length,
  failed: runs.filter((r) => r.status === "failure").length,
  agents: 4,
};
