"use client"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Link } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export function DashboardBreadcrumb() {
    const pathname = usePathname(); // Get the current pathname
    const pathSegments = pathname.split('/').filter(Boolean); // Split path into segments and remove empty segments
  
    return (
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
  
          {pathSegments.map((segment, index) => {
            const href = '/' + pathSegments.slice(0, index + 1).join('/'); // Create the href for the current segment
            const isLastSegment = index === pathSegments.length - 1; // Check if it's the last segment
  
            return (
              <React.Fragment key={index}>
                {/* Only show separator if not the last item */}
                {!isLastSegment && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isLastSegment ? (
                    <BreadcrumbPage>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)} {/* Capitalize the last segment */}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={href}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)} {/* Capitalize the segment */}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }