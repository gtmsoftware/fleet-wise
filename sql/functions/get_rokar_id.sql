CREATE OR REPLACE FUNCTION fleetwise_schema.get_next_rokar_id()
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
DECLARE
  current_month VARCHAR(3);
  current_year INTEGER;
  next_id VARCHAR;
BEGIN
  -- Get the current year and month
  SELECT EXTRACT(year FROM CURRENT_DATE), TO_CHAR(CURRENT_DATE, 'Mon') INTO current_year, current_month;

  -- Check if it's the 1st day of a new month
  IF EXTRACT(day FROM CURRENT_DATE) = 1 THEN
    -- Reset the sequence to 1
    PERFORM setval('fleetwise_schema.rokar_monthly_seq', 1);
  END IF;

  -- Generate the next ID with the format 'YYYY-MMM-SequenceNumber'
  SELECT current_year || '-' || current_month || '-' || nextval('fleetwise_schema.rokar_monthly_seq') INTO next_id;

  -- Return the next ID
  RETURN next_id;
END;
$function$
;
