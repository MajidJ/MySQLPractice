SELECT * FROM top5000
GROUP BY artist
HAVING COUNT( DISTINCT title ) > 1