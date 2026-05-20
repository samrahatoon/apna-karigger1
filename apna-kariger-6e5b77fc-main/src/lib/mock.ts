export type Provider = {
  id: string;
  name: string;
  trade: string;
  rating: number;
  reviews: number;
  distanceKm: number;
  etaMin: number;
  priceFrom: number;
  jobs: number;
  experienceYears: number;
  badge: "Verified" | "Top Rated" | "Pro";
  area: string;
  avatar: string;
  bio: string;
};

const av = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffb36b,ff8a3d,1a2350&radius=50`;

export const providers: Provider[] = [
  { id: "p1", name: "Imran Khalid", trade: "AC Technician", rating: 4.9, reviews: 312, distanceKm: 1.2, etaMin: 18, priceFrom: 1500, jobs: 540, experienceYears: 9, badge: "Top Rated", area: "G-13, Islamabad", avatar: av("Imran"), bio: "Specialist in split & inverter AC servicing, gas refill and quick diagnostics." },
  { id: "p2", name: "Asad Rehman", trade: "AC Technician", rating: 4.7, reviews: 184, distanceKm: 2.4, etaMin: 25, priceFrom: 1200, jobs: 311, experienceYears: 6, badge: "Verified", area: "G-11, Islamabad", avatar: av("Asad"), bio: "Affordable AC repair with 6-month service guarantee." },
  { id: "p3", name: "Bilal Ahmed", trade: "AC Technician", rating: 4.8, reviews: 96, distanceKm: 3.1, etaMin: 32, priceFrom: 1800, jobs: 220, experienceYears: 8, badge: "Pro", area: "F-11, Islamabad", avatar: av("Bilal"), bio: "Commercial & residential HVAC engineer." },
  { id: "p4", name: "Sana Tariq", trade: "Beautician", rating: 5.0, reviews: 421, distanceKm: 0.8, etaMin: 12, priceFrom: 2500, jobs: 612, experienceYears: 7, badge: "Top Rated", area: "G-13, Islamabad", avatar: av("Sana"), bio: "Bridal & party makeup, certified by Depilex." },
  { id: "p5", name: "Hamza Iqbal", trade: "Electrician", rating: 4.6, reviews: 145, distanceKm: 1.9, etaMin: 22, priceFrom: 800, jobs: 280, experienceYears: 5, badge: "Verified", area: "G-13, Islamabad", avatar: av("Hamza"), bio: "Wiring, breaker, UPS install & rewiring jobs." },
];

export const services = [
  { key: "ac", label: "AC Technician", emoji: "❄️" },
  { key: "electrician", label: "Electrician", emoji: "⚡" },
  { key: "plumber", label: "Plumber", emoji: "🔧" },
  { key: "beautician", label: "Beautician", emoji: "💄" },
  { key: "mechanic", label: "Mechanic", emoji: "🛠️" },
  { key: "tutor", label: "Tutor", emoji: "📚" },
];

export const quickPrompts = [
  "Mujhe kal G-13 mein AC technician chahiye",
  "Tomorrow morning plumber in F-11",
  "Ghar par bridal makeup chahiye Saturday ko",
  "Electrician for UPS install today evening",
];

export const notifications = [
  { id: "n1", title: "Booking confirmed", body: "Imran Khalid will arrive tomorrow 10:00 AM at G-13.", time: "2m ago", kind: "booking" },
  { id: "n2", title: "Reminder scheduled", body: "We'll remind you 1 hour before your AC service.", time: "5m ago", kind: "ai" },
  { id: "n3", title: "New top-rated Kariger near you", body: "Sana Tariq just joined within 1 km of you.", time: "1h ago", kind: "update" },
  { id: "n4", title: "Job completed", body: "Rate Hamza Iqbal for last week's electrical work.", time: "Yesterday", kind: "status" },
];

export const bookingHistory = [
  { id: "b1001", trade: "AC Technician", name: "Imran Khalid", date: "Tomorrow, 10:00 AM", status: "Upcoming" },
  { id: "b0998", trade: "Electrician", name: "Hamza Iqbal", date: "12 Mar", status: "Completed" },
  { id: "b0987", trade: "Beautician", name: "Sana Tariq", date: "28 Feb", status: "Completed" },
];
