import toastr from 'toastr'
import 'toastr/toastr.scss'

toastr.options = {
    closeButton: true,
    progressBar: true,
    preventDuplicates: false,
    positionClass: 'toast-top-right',
    showDuration: '200',
    hideDuration: '300',
    timeOut: '2000',
    extendedTimeOut: '500',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
}

export const success = toastr.success
export const warning = toastr.warning
export const error = toastr.error
