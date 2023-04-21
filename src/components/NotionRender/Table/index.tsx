import { TableBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import './index.css'
import { getBlocks } from '@/lib/notion/getBlocks';
import NotionRender from '..';
import { cn } from '@/lib/utils';

interface TableProps extends React.PropsWithChildren {
  block: TableBlockObjectResponse,
}

const Table = async ({ block }: TableProps) => {
  const table_width = block.table.table_width
  const has_children = block.has_children
  const has_row_header = block.table.has_row_header
  const has_col_header = block.table.has_column_header
  // if (has_children) {
    const data = (await getBlocks(block.id))
  // }

  return (
    <div className="overflow-x-auto max-full">
      <table className="table-auto border table-bordered dark:border-[#2f2f2f] border-gray-200">
        <tbody className={cn("divide-y dark:divide-[#2f2f2f] divide-gray-200", {'table-row': has_row_header, 'table-col': has_col_header} )}>
         {
          data?.map((block) =>  <NotionRender key={block.id} block={block} />
          )
         }
        </tbody>
      </table>
    </div>
  );
};

export default Table;


