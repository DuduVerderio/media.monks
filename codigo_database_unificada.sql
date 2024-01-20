CREATE TABLE database AS
SELECT fixed_database_1.*, fixed_database_2.c2
FROM fixed_database_1
JOIN fixed_database_2 
ON fixed_database_1.c2 = fixed_database_2.c1;