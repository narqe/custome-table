import pageNotFound from '../../assets/pageNotFound.gif';
import serverError from '../../assets/serverError.gif';
import forbidden from '../../assets/forbidden.gif';
import noInternetConection from '../../assets/noInternetConection.gif';

const errors = {
  403: {
    header: 'Error 403',
    svg: forbidden,
    title: 'unauthorizedAccessTitle',
    message: 'unauthorizedAccessDescription',
    buttonText: 'loginLabel',
    showDetails: false,
  },
  404: {
    header: 'Error 404',
    svg: pageNotFound,
    title: 'pageNotFoundTitle',
    message: 'pageNotFoundDescription',
    buttonText: 'backLabel',
    showDetails: true,
  },
  500: {
    header: 'Error 500',
    svg: serverError,
    title: 'serverErrorTitle',
    message: 'serverErrorDesc',
    buttonText: 'reloadLabel',
    showDetails: true,
  },
  offline: {
    header: 'No connection',
    svg: noInternetConection,
    title: 'noConnectionTitle',
    message: 'noConnectionDesc',
    buttonText: 'reloadLabel',
    showDetails: false,
  },
};

export default errors;
