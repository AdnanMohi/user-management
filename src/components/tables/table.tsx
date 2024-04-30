
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  getFilteredRowModel

} from "@tanstack/react-table";
import { useProducts } from "./hooks/query/query";
import { Button } from "antd";
import { useState } from "react";

export default function Table() {
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState('');

  

    const columns = [
        { 
            header: 'ID',
            accessorKey: 'id',
        },
        { 
            header: 'Title',
            accessorKey: 'title',
        },
        { 
            header: 'Description',
            accessorKey: 'description',
        },
        { 
            header: 'Price',
            accessorKey: 'price',
        },
        { 
            header: 'Discount Percentage',
            accessorKey: 'discountPercentage',
        },
        { 
            header: 'Rating',
            accessorKey: 'rating',
        },
        { 
            header: 'Stock',
            accessorKey: 'stock',
        },
        { 
            header: 'Brand',
            accessorKey: 'brand',
        },
        { 
            header: 'Category',
            accessorKey: 'category',
        },
       
      
    ]

    const data = useProducts().data?.products || []

  

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting:sorting,
      globalFilter:filtering
    },
    onSortingChange: (newSorting:any ) =>
      setSorting(newSorting),
    onGlobalFilterChange: setFiltering,

  });
 
    


  return (
    <div className="">
        <div className="mx-20 overflow-y-auto ">
          <input type="text" className="border-2 border-gray-300 p-2" 
          placeholder="Search"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)} 
        />

    <table className="min-w-full bg-white border-collapse ">
      <thead className="bg-gray-200">
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((headers) => (
            <th
            key={headers.id}
            onClick={headers.column.getToggleSortingHandler()}
          >
            {headers.isPlaceholder ? null : (
              <div>
                {flexRender(
                  headers.column.columnDef.header,
                  headers.getContext()
                )}
                {
                  { asc: '🔼', desc: '🔽' }[
                    headers.column.getIsSorted() ?? null
                  ]
                }
              </div>
            )}
          </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="text-gray-700">
        {tableInstance.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-1 px-2">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  
    <div className="flex justify-end mr-20" >
        <Button onClick={() => tableInstance.setPageIndex(0)}>First Page</Button>
        <Button disabled={!tableInstance.getCanPreviousPage()} onClick={() => tableInstance.previousPage()}>Previous Page</Button>
        <Button disabled={!tableInstance.getCanNextPage()} onClick={() => tableInstance.nextPage()}>Next Page</Button>
        <Button onClick={() => tableInstance.setPageIndex(tableInstance.getPageCount() - 1)}>Last Page</Button>
    </div>

  </div>
  );
}
