export const idlFactory = ({ IDL }) => {
  const FarmLocation = IDL.Record({
    'latitude' : IDL.Float64,
    'longitude' : IDL.Float64,
  });
  return IDL.Service({
    'getDairyFarms' : IDL.Func([], [IDL.Vec(FarmLocation)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
