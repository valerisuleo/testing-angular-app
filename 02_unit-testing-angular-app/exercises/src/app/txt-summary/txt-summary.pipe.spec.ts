import { TxtSummaryPipe } from './txt-summary.pipe';


xdescribe('TxtSummaryPipe', () => {
  let pipe: TxtSummaryPipe;

  beforeEach(() => {
     pipe = new TxtSummaryPipe();
  });

  it('should return an empty string if input is null', () => {
    expect(pipe.transform(null)).toEqual('');
  });

  it('should return an empty string if input is undefined', () => {
    expect(pipe.transform(undefined)).toEqual('');
  });

  it('should return an empty string if input is empty string', () => {
    expect(pipe.transform('')).toEqual('');
   });

   it('should return a substring if value.lenght is > 10', () => {
     expect(pipe.transform('hakunamatata')).toBe('hakunamata...');
   });

   it('should return the same string if value.lenght is = 10', () => {
     expect(pipe.transform('1234')).toBe('1234');
   });

   it('should return a substring if we set the limit', () => {
     expect(pipe.transform('12345678910', 5)).toBe('12345...');
   });
});
