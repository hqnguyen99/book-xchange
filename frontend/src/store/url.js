const url= 'https://young-island-58664.herokuapp.com/EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com:99';
const url1= 'https://young-island-58664.herokuapp.com/EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com:5000';
const Url= {
    home_url: '',
    login_url: url + '/auth/login',
    signup_url: url1 + '/user/signup',
    refreshToken_url: url+ '/auth/refreshToken'
};
export default Url;
