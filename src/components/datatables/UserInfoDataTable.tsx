import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserPetInfoType } from "@/lib/types";

function UserInfoDataTable({ data }: { data: UserPetInfoType[] }) {
  return (
    <div className="w-full mt-4">
      <h1 className="text-2xl w-full text-center">User Quote Information</h1>
      <Table className="overflow-scroll">
        <TableCaption className="w-full">All User Objects Created</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Zip</TableHead>
            <TableHead>Reference</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Breed</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, key) => (
            <TableRow key={key}>
              <TableCell>
                {item.name.firstName + " " + item.name.lastName || "n/a"}
              </TableCell>
              <TableCell>{item.email || "n/a"}</TableCell>
              <TableCell>{item.zip || "n/a"}</TableCell>
              <TableCell>{item.reference || "n/a"}</TableCell>
              <TableCell>{item.petName || "n/a"}</TableCell>
              <TableCell>{item.animal || "n/a"}</TableCell>
              <TableCell>{item.breed || "n/a"}</TableCell>
              <TableCell>{item.age.value || "n/a"}</TableCell>
              <TableCell>{item.gender || "n/a"}</TableCell>
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

export default UserInfoDataTable;
