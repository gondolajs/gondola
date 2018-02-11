import PostStream from '../../app/post_stream';

describe("PostStream", function() {
  it("is a singleton class", function() {
    let post_stream = new PostStream();
    let post_stream2 = new PostStream();
    expect(post_stream).toEqual(post_stream2);
  });
});
