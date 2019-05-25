// import React from 'react'
// import PropTypes from 'prop-types'
// import { withProps } from 'recompose'
// import isEmpty from 'lodash/isEmpty'
// import { error } from 'shared/components/toastr'
//
// import IconButton from 'shared/components/IconButton'
// import { formatDate } from 'shared/utils/format'
// import { ACTIONS } from '../../modules/static'
//
// import style from './style.scss'
//
// const CustomCell = (props) => <div className="organization-status">{props.cellData || 'N/A'}</div>
// CustomCell.propTypes = {
//     cellData: PropTypes.any,
// }
//
// const ActionsCell = ({ rowData, onActionClick }) => (
//     <div className="actions">
//         <IconButton
//             iconName="ion-email"
//             title="Contact Emails"
//             onClick={() => {
//                 if (isEmpty(rowData.plan)) {
//                     error('The Organization does not have a Subscription Plan!')
//                     return
//                 }
//
//                 onActionClick({ data: rowData, actionType: ACTIONS.SEND_AGREEMENT_CONTACT_MAIL })
//             }}
//         />
//     </div>
// )
// ActionsCell.propTypes = {
//     rowData: PropTypes.object,
//     onActionClick: PropTypes.func
// }
//
// export const COLUMNS = (props) => [
//     {
//         width: 100,
//         dataKey: 'is_subscriber',
//         flexGrow: 1,
//         cellDataGetter: ({ rowData }) => rowData.organization.is_subscriber ? 'Subscriber' : 'SubOrg',
//         headerOptions: {
//             title: 'Org Level'
//         }
//     },
//     {
//         width: 400,
//         dataKey: 'name',
//         sortKey: 'organization.name',
//         sortable: true,
//         flexGrow: 1,
//         cellDataGetter: ({ rowData }) => rowData.organization.name || '---',
//         headerOptions: {
//             title: 'Organization Name'
//         }
//     },
//     {
//         width: 100,
//         dataKey: 'planName',
//         cellDataGetter: ({ rowData }) => rowData.plan.name,
//         flexGrow: 1,
//         headerOptions: {
//             title: 'Plan Name',
//         }
//     },
//     {
//         width: 100,
//         dataKey: 'activeOn',
//         cellDataGetter: ({ rowData }) =>
//             rowData.subscription.starts_on ? formatDate(rowData.subscription.starts_on, 'DD-MMM-YYYY', true) : '---',
//         headerOptions: {
//             title: 'Active On',
//         }
//     },
//     {
//         width: 300,
//         dataKey: 'activeUser',
//         // We cannot add proptypes for internal child component like this
//         // eslint-disable-next-line react/prop-types
//         cellDataGetter: ({ rowData }) => {
//             const usage = rowData.usage
//             return (<div>
//                     Total: <span className={style['count-hightlight']}>{usage.web_active_users + usage.mobile_active_users}</span>
//                     &nbsp;(Web user: <span className={style['count-hightlight']}>{usage.web_active_users}</span> |
//                     Mobile user: <span className={style['count-hightlight']}>{usage.mobile_active_users}</span>)
//                 </div>
//             )
//         },
//         headerOptions: {
//             title: 'Active User',
//         }
//     },
//     {
//         width: 100,
//         dataKey: 'customId',
//         flexGrow: 1,
//         cellDataGetter: ({ rowData }) => rowData.organization.custom_id || '---',
//         headerOptions: {
//             title: 'Custom Id'
//         }
//     },
//     {
//         width: 150,
//         dataKey: 'contractSignedDate',
//         cellDataGetter: ({ rowData }) => rowData.subscription && rowData.subscription.contract_signed_date
//             ? formatDate(rowData.subscription.contract_signed_date, 'DD-MMM-YYYY', true) : 'N/A',
//         headerOptions: {
//             title: 'Contract Signed Date',
//         }
//     },
//     {
//         width: 150,
//         dataKey: 'nextDueDate',
//         cellDataGetter: ({ rowData }) => rowData.subscription && rowData.subscription.ends_on
//             ? formatDate(rowData.subscription.ends_on, 'DD-MMM-YYYY', true) : 'N/A',
//         headerOptions: {
//             title: 'Next Due Date',
//         }
//     },
//     {
//         width: 80,
//         dataKey: 'action',
//         headerOptions: {
//             title: 'Actions'
//         },
//         cellOptions: {
//             CellRenderer: withProps(props)(ActionsCell)
//         }
//     }
// ]
