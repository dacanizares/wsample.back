function MapTo<TSource extends object, TDestination extends object>(
  source: TSource, destination: TDestination): TDestination 
{
  type keysDestination = keyof TDestination;

  Object.entries(source).forEach(([key, value]) => {
    if (key in destination) {
      destination[key as keysDestination] = value;
    }
  });

  return destination;
}

export default MapTo;
