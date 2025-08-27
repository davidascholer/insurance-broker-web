import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LinksClickedType } from "@/lib/types";

function LinksClickedDataTable({ data }: { data: LinksClickedType[] }) {
  return (
    <div className="w-full mt-4">
      <h1 className="text-2xl w-full text-center">Links Clicked</h1>
      <Table className="overflow-scroll">
        <TableCaption className="w-full">All Links Clicked</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Insurer</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((linkClicked, key) => (
            <TableRow key={key}>
              <TableCell className="font-medium">
                {linkClicked.insurer || "n/a"}
              </TableCell>
              <TableCell>{linkClicked.animal || "n/a"}</TableCell>
              <TableCell>{linkClicked.breed || "n/a"}</TableCell>
              <TableCell>{linkClicked.weight || "n/a"}</TableCell>
              <TableCell>{linkClicked.email || "n/a"}</TableCell>
              <TableCell>
                {linkClicked.timestamp
                  ? new Date(linkClicked.timestamp).toLocaleString()
                  : "n/a"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default LinksClickedDataTable;
