// Define event categories with names and colors
export interface EventCategory {
    id: string
    name: string
    color: string
    bgColor: string
    borderColor: string
  }
  
  export const eventCategories: EventCategory[] = [
    {
      id: "work",
      name: "Work",
      color: "#ffffff",
      bgColor: "#3b82f6", // blue-500
      borderColor: "#2563eb", // blue-600
    },
    {
      id: "personal",
      name: "Personal",
      color: "#ffffff",
      bgColor: "#10b981", // emerald-500
      borderColor: "#059669", // emerald-600
    },
    {
      id: "meeting",
      name: "Meeting",
      color: "#ffffff",
      bgColor: "#8b5cf6", // violet-500
      borderColor: "#7c3aed", // violet-600
    },
    {
      id: "appointment",
      name: "Appointment",
      color: "#ffffff",
      bgColor: "#f97316", // orange-500
      borderColor: "#ea580c", // orange-600
    },
    {
      id: "other",
      name: "Other",
      color: "#ffffff",
      bgColor: "#6b7280", // gray-500
      borderColor: "#4b5563", // gray-600
    },
  ]
  
  // Helper function to get a category by ID
  export function getCategoryById(id: string): EventCategory {
    return eventCategories.find((cat) => cat.id === id) || eventCategories[4] // Default to "Other"
  }
  