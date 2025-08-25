import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { HitsDataType } from "@/lib/types";
import { Link } from "react-router-dom";

function HitsDataTable({ data }: { data: HitsDataType[] }) {
  return (
    <div className="w-full mt-4">
      <h1 className="text-2xl w-full text-center">Hits</h1>
      <Table>
        <TableCaption className="w-full">
          All unique visits to the Pipa Home page
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Referrer</TableHead>
            <TableHead>Param Origin</TableHead>
            <TableHead>Client IP</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((hit, key) => (
            <TableRow key={key}>
              <TableCell className="font-medium">
                {hit.referrer || "n/a"}
              </TableCell>
              <TableCell>{hit.origin || "n/a"}</TableCell>
              <TableCell>
                {hit.ip ? (
                  <Link
                    to={"https://iplocation.io/ip/" + hit.ip}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-(--primary-coral) font-semibold"
                  >
                    {hit.ip}
                  </Link>
                ) : (
                  "n/a"
                )}
              </TableCell>
              <TableCell className="text-right">
                {hit.timestamp
                  ? new Date(hit.timestamp).toLocaleString()
                  : "n/a"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}

export default HitsDataTable;
