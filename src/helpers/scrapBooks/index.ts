const scrapBook = (data: string[]) => {
  const groupedRaw: { [key: string]: number } = data.reduce(
    (grouped: { [key: string]: number }, current) => {
      if (!grouped[current]) grouped[current] = 0;
      grouped[current] += 1;
      return grouped;
    },
    {}
  );

  const grouped = Object.entries(groupedRaw).map((item) => ({
    title: item[0],
    count: item[1],
  }));

  const sorted = grouped.sort((a, b) => (a.count > b.count ? -1 : 1));

  const titles = sorted.map((item) => item.title).splice(0, 10);
  return titles;
};

export { scrapBook };
