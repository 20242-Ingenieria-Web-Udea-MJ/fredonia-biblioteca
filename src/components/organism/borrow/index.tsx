import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_ALL_REFERENCES } from '@/utils/gql/querys/reference';

type Reference = {
  id: string;
  title: string;
  publisher: string;
  publicationYear: string;
  ISBN: string;
  genre: string;
  availableUnits: string;
};

export default function Component() {
  // const [references, setReferences] = React.useState([]);
  // useQuery(GET_ALL_REFERENCES, {
  //   fetchPolicy: 'cache-and-network',
  //   onCompleted: (data) => {
  //     setReferences(data.references);
  //   },
  // });

  const [references, setReferences] = React.useState<Reference[]>([]);
  
  const { loading, error } = useQuery(GET_ALL_REFERENCES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setReferences(data.references);
    },
  });

  console.log(useQuery(GET_ALL_REFERENCES));

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>;


  return (
      <Card>
        <CardHeader className='px-7'>
          <CardTitle>Books</CardTitle>
          <CardDescription>Available books on the library</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className='hidden sm:table-cell'>Publisher</TableHead>
                <TableHead className='hidden sm:table-cell'>Publication year</TableHead>
                <TableHead className='hidden md:table-cell'>ISBN</TableHead>
                <TableHead className='text-right'>Available units</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {references.map((reference: Reference) => (
                <TableRow key={reference.id} className='bg-accent'>
                  {/* <TableCell>
                    <Avatar>
                      <AvatarImage src={reference.image} alt='@shadcn' />
                    </Avatar>
                  </TableCell> */}
                  <TableCell className='hidden sm:table-cell'>
                    <div className='font-medium'>{reference.title}</div>
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>{reference.publisher}</TableCell>
                  <TableCell className='hidden md:table-cell'>{reference.publicationYear}</TableCell>
                  <TableCell className='hidden md:table-cell'>{reference.ISBN}</TableCell>
                  <TableCell className='hidden md:table-cell'>{reference.publisher}</TableCell>
                  <TableCell className='hidden md:table-cell'>{reference.availableUnits}</TableCell>
                  {/* <TableCell className='hidden sm:table-cell'>
                    <Badge className='text-xs' variant='secondary'>
                      Fulfilled
                    </Badge>
                  </TableCell> */}
                  {/* <TableCell className='text-right'>
                    <Link href={`/references/${reference.id}`}>
                      <Badge className='text-xs' variant='default'>
                        Edit
                      </Badge>
                    </Link>
                    <Badge className='text-xs' variant='destructive'>
                      Delete
                    </Badge>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

//   return (
//     <Card>
//       <CardHeader className='px-7'>
//         <CardTitle>Customers</CardTitle>
//         <CardDescription>Recent orders from your store.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Customer</TableHead>
//               <TableHead className='hidden sm:table-cell'>Type</TableHead>
//               <TableHead className='hidden sm:table-cell'>Status</TableHead>
//               <TableHead className='hidden md:table-cell'>Date</TableHead>
//               <TableHead className='text-right'>Amount</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             <TableRow className='bg-accent'>
//               <TableCell>
//                 <div className='font-medium'>Liam Johnson</div>
//                 <div className='hidden text-sm text-muted-foreground md:inline'>
//                   liam@example.com
//                 </div>
//               </TableCell>
//               <TableCell className='hidden sm:table-cell'>Sale</TableCell>
//               <TableCell className='hidden sm:table-cell'>
//                 <Badge className='text-xs' variant='secondary'>
//                   Fulfilled
//                 </Badge>
//               </TableCell>
//               <TableCell className='hidden md:table-cell'>2023-06-23</TableCell>
//               <TableCell className='text-right'>$250.00</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>
//                 <div className='font-medium'>Olivia Smith</div>
//                 <div className='hidden text-sm text-muted-foreground md:inline'>
//                   olivia@example.com
//                 </div>
//               </TableCell>
//               <TableCell className='hidden sm:table-cell'>Refund</TableCell>
//               <TableCell className='hidden sm:table-cell'>
//                 <Badge className='text-xs' variant='outline'>
//                   Declined
//                 </Badge>
//               </TableCell>
//               <TableCell className='hidden md:table-cell'>2023-06-24</TableCell>
//               <TableCell className='text-right'>$150.00</TableCell>
//             </TableRow>
//             {/* <TableRow>
//                           <TableCell>
//                             <div className="font-medium">Liam Johnson</div>
//                             <div className="hidden text-sm text-muted-foreground md:inline">
//                               liam@example.com
//                             </div>
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             Sale
//                           </TableCell>
//                           <TableCell className="hidden sm:table-cell">
//                             <Badge className="text-xs" variant="secondary">
//                               Fulfilled
//                             </Badge>
//                           </TableCell>
//                           <TableCell className="hidden md:table-cell">
//                             2023-06-23
//                           </TableCell>
//                           <TableCell className="text-right">$250.00</TableCell>
//                         </TableRow> */}
//             <TableRow>
//               <TableCell>
//                 <div className='font-medium'>Noah Williams</div>
//                 <div className='hidden text-sm text-muted-foreground md:inline'>
//                   noah@example.com
//                 </div>
//               </TableCell>
//               <TableCell className='hidden sm:table-cell'>Subscription</TableCell>
//               <TableCell className='hidden sm:table-cell'>
//                 <Badge className='text-xs' variant='secondary'>
//                   Fulfilled
//                 </Badge>
//               </TableCell>
//               <TableCell className='hidden md:table-cell'>2023-06-25</TableCell>
//               <TableCell className='text-right'>$350.00</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>
//                 <div className='font-medium'>Emma Brown</div>
//                 <div className='hidden text-sm text-muted-foreground md:inline'>
//                   emma@example.com
//                 </div>
//               </TableCell>
//               <TableCell className='hidden sm:table-cell'>Sale</TableCell>
//               <TableCell className='hidden sm:table-cell'>
//                 <Badge className='text-xs' variant='secondary'>
//                   Fulfilled
//                 </Badge>
//               </TableCell>
//               <TableCell className='hidden md:table-cell'>2023-06-26</TableCell>
//               <TableCell className='text-right'>$450.00</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>
//                 <div className='font-medium'>Liam Johnson</div>
//                 <div className='hidden text-sm text-muted-foreground md:inline'>
//                   liam@example.com
//                 </div>
//               </TableCell>
//               <TableCell className='hidden sm:table-cell'>Sale</TableCell>
//               <TableCell className='hidden sm:table-cell'>
//                 <Badge className='text-xs' variant='secondary'>
//                   Fulfilled
//                 </Badge>
//               </TableCell>
//               <TableCell className='hidden md:table-cell'>2023-06-23</TableCell>
//               <TableCell className='text-right'>$250.00</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>
//                 <div className='font-medium'>Olivia Smith</div>
//                 <div className='hidden text-sm text-muted-foreground md:inline'>
//                   olivia@example.com
//                 </div>
//               </TableCell>
//               <TableCell className='hidden sm:table-cell'>Refund</TableCell>
//               <TableCell className='hidden sm:table-cell'>
//                 <Badge className='text-xs' variant='outline'>
//                   Declined
//                 </Badge>
//               </TableCell>
//               <TableCell className='hidden md:table-cell'>2023-06-24</TableCell>
//               <TableCell className='text-right'>$150.00</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>
//                 <div className='font-medium'>Emma Brown</div>
//                 <div className='hidden text-sm text-muted-foreground md:inline'>
//                   emma@example.com
//                 </div>
//               </TableCell>
//               <TableCell className='hidden sm:table-cell'>Sale</TableCell>
//               <TableCell className='hidden sm:table-cell'>
//                 <Badge className='text-xs' variant='secondary'>
//                   Fulfilled
//                 </Badge>
//               </TableCell>
//               <TableCell className='hidden md:table-cell'>2023-06-26</TableCell>
//               <TableCell className='text-right'>$450.00</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }
