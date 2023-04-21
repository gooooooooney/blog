import { TableRowBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Text } from "./Text";
import RichText from "./RichText";
import { cn } from "@/lib/utils";

interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  block: TableRowBlockObjectResponse;
}

const TableRow = ({ block, ...props }: TableRowProps) => {


  return (
    <>
      <tr>
        {
          block.table_row.cells.map((cell, index) => {
            return (
              <th   key={cell[0]?.plain_text ?? index} className={cn('min-w-[120px]  max-w-[240px] min-h-[32px] align-top')}>
                <td className="px-[9px] py-[7px] whitespace-nowrap " >
                  <RichText rich_text={cell} />
                </td>
              </th>
            )
          })
        }
      </tr>
    </>
  );
};

export default TableRow;
