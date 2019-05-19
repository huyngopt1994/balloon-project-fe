// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { SimpleDataTable } from 'shared/components/Table'
// import Pagination from 'shared/components/Pagination'
// import LoadingIndicator from 'shared/components/LoadingIndicator'
// import { COLUMNS } from './tableConfig'
// import style from './style.scss'
// import { ACTIONS } from '../../modules/static'
// import SendSubscriptionAgreementModal from '../SendSubscriptionAgreementModal'
//
// export default class AdminCompanyList extends PureComponent {
//     static propTypes = {
//         pagination: PropTypes.object.isRequired,
//         list: PropTypes.array.isRequired,
//         fetchOrganizations: PropTypes.func.isRequired,
//         filterOrganizations: PropTypes.func.isRequired,
//         setPageSize: PropTypes.func.isRequired,
//         fetching: PropTypes.bool.isRequired,
//         setSortable: PropTypes.func.isRequired,
//         organizations: PropTypes.object.isRequired,
//         resetOrgContactsForm: PropTypes.func,
//         setOrgContactsFilter: PropTypes.func.isRequired,
//         orgContacts: PropTypes.object,
//         fetchOrgContacts: PropTypes.func,
//         triggerSubmitForm: PropTypes.func,
//         sendAgreementContactMail: PropTypes.func,
//         stepValidation: PropTypes.array,
//         selectOrg: PropTypes.func
//     }
//
//     constructor(props) {
//         super(props)
//         this.state = { showSubscriptionAgreementModal: false }
//         this.columnsSchema = this.columnsRenderer()
//     }
//
//     columnsRenderer = () => {
//         return COLUMNS({ onActionClick: this.handleActionClick })
//     }
//
//     handleActionClick = ({ data, actionType }) => {
//         const { fetchOrgContacts, selectOrg } = this.props
//         if (actionType === ACTIONS.SEND_AGREEMENT_CONTACT_MAIL) {
//             selectOrg(data)
//             fetchOrgContacts({ orgId: data.organization.id })
//             this.setState({ showSubscriptionAgreementModal: true })
//         }
//     }
//
//     onHideInviteModal = () => {
//         const { resetOrgContactsForm } = this.props
//         this.setState({ showSubscriptionAgreementModal: false }, resetOrgContactsForm)
//     }
//
//     onPageChange = (page) => {
//         const { fetchOrganizations } = this.props
//         fetchOrganizations(page)
//     }
//
//     onPageSizeChange = (pageSize) => {
//         const { setPageSize } = this.props
//         setPageSize(pageSize)
//         this.onPageChange({ page: 1, pageSize })
//     }
//
//     onSortChange = (sort) => {
//         const { setSortable, filterOrganizations } = this.props
//         setSortable(sort)
//         filterOrganizations()
//     }
//
//     handleSubmitForm = (formData) => {
//         const { sendAgreementContactMail } = this.props
//         sendAgreementContactMail && sendAgreementContactMail(formData)
//     }
//
//     render() {
//         const {
//             pagination, list, fetching, organizations,
//             setOrgContactsFilter, fetchOrgContacts, orgContacts,
//             triggerSubmitForm, stepValidation
//         } = this.props
//         const { showSubscriptionAgreementModal } = this.state
//         return (
//             <div className={style.container}>
//                 {
//                     fetching &&
//                     <LoadingIndicator />
//                 }
//                 <div className="organizations">
//                     <SimpleDataTable columns={this.columnsSchema} data={list} options={{
//                         sortable: {
//                             columnName: organizations.sort.columnName,
//                             direction: organizations.sort.direction,
//                             setSortable: this.onSortChange
//                         }
//                     }} />
//                 </div>
//                 <Pagination
//                     {...pagination}
//                     onPageChange={this.onPageChange}
//                     onPageSizeChange={this.onPageSizeChange}
//                 />
//                 {showSubscriptionAgreementModal && (
//                     <SendSubscriptionAgreementModal
//                         showModal={showSubscriptionAgreementModal}
//                         setOrgContactsFilter={setOrgContactsFilter}
//                         orgContactsInstance={orgContacts}
//                         fetchOrgContacts={fetchOrgContacts}
//                         triggerSubmitForm={triggerSubmitForm}
//                         stepValidation={stepValidation}
//                         onHideModal={this.onHideInviteModal}
//                         submitForm={this.handleSubmitForm}
//                     />
//                 )}
//             </div>
//         )
//     }
// }
