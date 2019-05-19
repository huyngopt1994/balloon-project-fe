import toastr from 'toastr'
import 'toastr/toastr.scss'

toastr.options = {
    closeButton: true,
    progressBar: true,
    preventDuplicates: false,
    positionClass: 'toast-top-right',
    showDuration: '400',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
}

export const success = toastr.success
export const warning = toastr.warning
export const error = toastr.error
