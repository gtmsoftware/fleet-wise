CREATE OR REPLACE FUNCTION fleetwise_schema.save_unloading(unloaddt timestamp without time zone, sale_point_param integer, buyer_param integer, weight_param numeric, rate_param numeric, total_param numeric, cr_dr_param text, vehiclenumber_param text, rokar_param text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Validate 'vehiclenumber' against 'rokar' in 'loading' table
  IF NOT EXISTS (
    SELECT 1 
    FROM fleetwise_schema.loading l
    WHERE l.vehiclenumber = vehiclenumber_param AND l.rokar = rokar_param
  ) THEN
    RAISE EXCEPTION 'Validation failed: vehiclenumber does not match rokar in loading table';
  END IF;

  -- Insert into 'unloading' table
  INSERT INTO fleetwise_schema.unloading (unloaddt, sale_point, buyer, weight, rate, total, cr_dr, vehiclenumber, rokar)
  VALUES (unloaddt, sale_point_param, buyer_param, weight_param, rate_param, total_param, cr_dr_param, vehiclenumber_param, rokar_param);
  
  -- Log success
  RAISE NOTICE 'Unloading entry added successfully';
END;
$function$
;
