
const url= 'https://young-island-58664.herokuapp.com/http://bookxchangebackend-env.eba-g2sbc6cf.us-east-1.elasticbeanstalk.com';

const Url= {
    home_url: '',
    login_url: url + '/auth/login',
    signup_url: url + '/user/signup',
    refreshToken_url: url+ '/auth/refreshToken',
    book_url: url + '/books/allBooks'
};
export default Url;
