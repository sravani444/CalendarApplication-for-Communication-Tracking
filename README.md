# Calendar Application for Communication Tracking

This is a React-based Calendar Application designed to help manage and track communications with different companies. The goal of the application is to ensure timely follow-ups and help maintain consistent professional relationships by logging past interactions, planning future communications, and managing communication frequencies based on predefined schedules.

## Features

### Admin Module
- **Company Management**: Add, edit, and delete companies. Each company entry includes:
  - Name
  - Location
  - LinkedIn Profile
  - Emails
  - Phone Numbers
  - Comments
  - Communication Periodicity (default time interval for scheduled communications)
  
- **Communication Method Management**: Admins can define communication methods, including:
  - Name (e.g., LinkedIn Post, Email)
  - Description (e.g., LinkedIn Post → LinkedIn Message → Email → Phone Call)
  - Sequence (order of communication methods)
  - Mandatory Flag (indicates if a method is mandatory)

### User Module
- **Dashboard**: A grid-like view where each row represents a company and columns include:
  - **Company Name**
  - **Last Five Communications**
  - **Next Scheduled Communication**

- **Color-Coded Highlights**:
  - **Red Highlight**: Overdue communication.
  - **Yellow Highlight**: Communication due today.

- **Interactive Features**:
  - Hover effect shows a tooltip with communication notes.
  
- **Communication Action**:
  - Users can select one or more companies and log new communications (e.g., LinkedIn Post, Email, etc.).
  - After submission, the highlight is reset for the selected companies.

- **Notifications**:
  - **Overdue Communications Grid**: Lists companies with overdue actions.
  - **Today’s Communications Grid**: Lists companies with tasks due today.
  - **Notification Icon**: Displays overdue and due communications with a badge.

- **Calendar View**:
  - View past communications.
  - View and manage upcoming communications.

### Reporting and Analytics (Optional)
- **Communication Frequency Report**: Visual representation of communication methods (bar/pie chart) with filters.
- **Engagement Effectiveness Dashboard**: Track and display the effectiveness of communication methods.
- **Overdue Communication Trends**: A trendline or heatmap showing overdue communications over time.
- **Downloadable Reports**: Export reports in PDF or CSV format.
- **Real-Time Activity Log**: A live feed of all communication activities.

## Technologies Used

- **React**: For building the user interface and managing state.
- **UUID**: To generate unique IDs for companies and communications.
- **CSS**: Custom styling for the app.
- **LocalStorage**: For persisting company and communication data across sessions.

## Setup and Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/communication-tracking-calendar.git
cd communication-tracking-calendar
