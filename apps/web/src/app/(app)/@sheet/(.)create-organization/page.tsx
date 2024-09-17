import { InterceptedSheetContent } from '@/src/components/intercepeted-sheet.content'
import { Sheet, SheetHeader, SheetTitle } from '@/src/components/ui/sheet'

import { OrganizationForm } from '../../create-organization/organization-form'

export default function CreateOrganization() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
