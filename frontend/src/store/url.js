const url= 'http://secondhandbookstore-env-1.eba-mzngembx.us-east-1.elasticbeanstalk.com';
const Url= {
    home_url: '',
    login_url: url + '/auth/login',
    signup_url: url + '/user/signup',
    refreshToken_url: url+ '/auth/refreshToken'
};
export default Url;
