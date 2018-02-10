import moment from 'moment';
import url from 'url';
import BasePost from '../base/post';

export default TwitterPost extends BasePost {
  constructor(rawPost) {
    super('twitter', rawPost);
  }

  get serviceId() {
    return this._rawPost.id_str;
  }

  get text() {
    return this._rawPost.text;
  }

  get externalURI() {
    return `https://twitter.com/${this._rawPost.user.screen_name}/status/${this._rawPost.id_str}`;
  }

  get author() {
    return {
      service: 'twitter',
      serviceId: this._rawPost.user.id_str,
      userName: this._rawPost.user.screen_name,
      displayName: this._rawPost.user.name,
      description: this._rawPost.user.description,
      avatar: this._rawPost.user.profile_image_url
    };
  }

  get mentions() {
    return this._rawPost.entities.user_mentions.map(n => {
      return {
        service: 'twitter',
        serviceId: n.id_str,
        userName: n.screen_name,
        displayName: n.name
      };
    });
  }

  get keywords() {
    return this._rawPost.entities.hashtags.map((n) => {
      return { phrase: n.text.toLowerCase() };
    });
  }

  get urls() {
    return this._rawPost.entities.urls.map((n) => {
      return {
        domain: url.parse(n.expanded_url).hostname,
        link: n.expanded_url,
        short_link: n.url
      };
    });
  }

  get photos() {
    var photos = [];
    if (this._rawPost.entities.media) {
      photos = this._rawPost.entities.media.map((n) => {
        return { image: n.media_url };
      });
    }
    return photos;
  }

  get timestamp() {
    return moment(this._rawPost.created_at, "ddd MMM DD HH:mm:ss Z YYYY").toISOString();
  }

  get source() {
    return {
      service: 'twitter',
      name: 'Twitter',
      description: 'Social networking and microblogging service utilising instant messaging, SMS or a web interface.',
      domain: 'twitter.com',
      external_uri: 'https://twitter.com/'
    };
  }
}
