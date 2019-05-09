import { TxtSummaryPipe } from './txt-summary.pipe';


// How many test do we have to write?
//
//
//
//
// it('should return an empty string if input is empty string', () => {
// });



describe('TxtSummaryPipe', () => {
  let pipe: TxtSummaryPipe;

  beforeEach(() => {
     pipe = new TxtSummaryPipe();
  });

  it('should return an empty string if input is null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should return an empty string if input is undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });
});
