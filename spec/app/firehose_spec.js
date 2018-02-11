import Firehose from '../../app/firehose';

describe("Firehose", function() {
  it("is a singleton class", function() {
    let firehose = new Firehose();
    let firehose2 = new Firehose();
    expect(firehose).toEqual(firehose2);
  });

   xit("emits events", function() {
    let firehose = new Firehose();
    spyOn(firehose, 'on').and.callThrough();
    expect(firehose.on.calls.any()).toBe(true);
    firehose.emit('post', '');
  });
});
