import MembersDataGrid from '@/components/members-datagrid/members-datagrid'
import NoSSRWrapper from '@/utils/no-ssr-wrapper'

const MembersPage = () => (
  <div className="p-5">
    <h4 className="pb-5"></h4>
    <div>
      <NoSSRWrapper>
        <MembersDataGrid />
      </NoSSRWrapper>
    </div>
  </div>
)

export default MembersPage
