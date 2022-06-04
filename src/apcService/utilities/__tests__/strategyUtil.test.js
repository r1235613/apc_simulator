const { sharonStrategy, defaultStrategy, ribeyeStrategy, newyorkStrategy} = require('../strategyUtil');

describe('Module strategyUtil', () => {
  const fakeThickness = 2.0; // 厚度
  const fakeMoisture = 0.65; // 濕度
  const fakeTFactor = 0.5;
  const fakeMFactor = 0.5;

  it('Method sharonStrategy', () => {
    const res = sharonStrategy(fakeThickness, fakeTFactor);

    expect(res).toStrictEqual({
      period: 20,
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method ribeyeStrategy', () => {
    const res = ribeyeStrategy(fakeThickness, fakeTFactor);

    expect(res).toStrictEqual({
      period: 25,
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method newyorkStrategy', () => {
    const res = newyorkStrategy(fakeThickness, fakeTFactor);

    expect(res).toStrictEqual({
      period: 22,
      temperature: (fakeThickness * fakeTFactor).toFixed(2),
    });
  });

  it('Method defaultStrategy', () => {
    const res = defaultStrategy(fakeMoisture, fakeMFactor);

    expect(res).toStrictEqual({
      period: (fakeMoisture * fakeMFactor).toFixed(2),
      temperature: 100,
    });
  });
});
