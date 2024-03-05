const useWeeks = (picksArray) => {
  const seasonDef = [
    { name: "Preseason", value: "1" },
    { name: "Regular Season", value: "2" },
    { name: "Post Season", value: "3" },
  ];

  const wA = picksArray.map((pick) =>
    JSON.stringify({
      week: pick.week,
      season: {
        name: seasonDef.find((item) => item.value === pick.season).name,
        number: pick.season,
      },
    })
  );

  let w = [...new Set(wA)];

  const weeks = w
    .map((item) => JSON.parse(item))
    .sort((a, b) => b.season - a.season)
    .sort((a, b) => b.week - a.week);

  // const seasons = w.map((item) => item.season);
  const sA = weeks.map((week) => JSON.stringify(week.season));
  let s = [...new Set(sA)];

  const seasons = s.map(item => JSON.parse(item))
    .sort((a,b) => b.number - a.number)


  return ({weeks: weeks, seasons: seasons});
};

export default useWeeks;
