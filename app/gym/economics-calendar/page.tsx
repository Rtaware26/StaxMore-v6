const EconomicsCalendarPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-5xl font-extrabold mb-8 text-center leading-tight tracking-tighter">
          Economics <span className="text-primary">Calendar</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
          Stay informed with real-time updates on key economic events and indicators that impact the markets.
        </p>

        {/* Placeholder for the Economics Calendar table */}
        <div className="bg-card rounded-xl shadow-md p-6 border border-border overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Currency</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Impact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actual</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Forecast</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Previous</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {/* Sample Data - Replace with actual data fetching logic */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">14:30 EST</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">USD</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">Consumer Price Index (CPI)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-500">High</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">0.4%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">0.3%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">0.2%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">09:00 GMT</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">EUR</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">ECB Interest Rate Decision</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">Very High</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">2.50%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">2.25%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">2.25%</td>
              </tr>
              {/* More rows can be added here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EconomicsCalendarPage; 