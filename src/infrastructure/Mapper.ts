export function MapTo<TSource extends object, TDestination extends object>(
  source: TSource, type: { new(): TDestination; }): TDestination 
{
  const destination = new type();
  type keysDestination = keyof TDestination;

  Object.entries(source).forEach(([key, value]) => {
    if (key in destination) {
      destination[key as keysDestination] = value;
    }
  });

  return destination;
}

export function MapAllTo<TSource extends object, TDestination extends object>(
  sourceList: TSource[], type: { new(): TDestination; }): TDestination[]
{
  const destinationList = new Array<TDestination>();
  sourceList.forEach((value) => {
    const mapped = MapTo<TSource, TDestination>(value, type);
    destinationList.push(mapped);
  });
  return destinationList;
}

