import moment from 'moment';
import url from 'url';
import BasePost from '../base/post';

export default InstagramPost extends BasePost {
  constructor(rawPost) {
    super('instagram', rawPost);
  }

  get serviceId() {
    return this._rawPost.id;
  }

  get text() {
    return this._rawPost.caption && this._rawPost.caption.text;
  }

  get externalURI() {
    return this._rawPost.link;
  }

  get author() {
    return {
      service: 'instagram',
      serviceId: this.serviceId,
      userName: this._rawPost.user.username,
      displayName: this._rawPost.user.full_name,
      description: this._rawPost.user.bio,
      avatar: this._rawPost.user.profile_picture
    };
  }

  get mentions() {
    return this._rawPost.users_in_photo.map(n => {
      return {
        service: 'instagram',
        serviceId: n.user.id,
        userName: n.user.username,
        displayName: n.user.full_name,
        avatar: n.user.profile_picture
      };
    });
  }

  get keywords() {
    return this._rawPost.tags.map((n) => {
      return { phrase: n.toLowerCase() };
    });
  }

  get urls() {
    return [];
  }

  get photos() {
    return [{
      image: this._rawPost.images.standard_resolution.url
    }];
  }

  get timestamp() {
    return moment.unix(this._rawPost.created_time).toISOString();
  }

  get source() {
    return {
      service: 'instagram',
      name: 'Instagram',
      description: "Capture and Share the World's Moments.",
      domain: 'instagram.com',
      external_uri: 'http://instagram.com/'
    };
  }
}
