const url= 'http://bookxchangebackend-env.eba-g2sbc6cf.us-east-1.elasticbeanstalk.com';
const Url= {
    
    login_url: url + '/auth/login',
    signup_url: url + '/user/signup',
    refreshToken_url: url+ '/auth/refreshToken'
};
export default Url;
