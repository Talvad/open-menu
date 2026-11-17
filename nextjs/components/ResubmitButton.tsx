import { resubmitShopAction } from '@/actions/shop'
import { ActionForm } from './ActionForm'

export function ResubmitButton({ shopId }: { shopId: string }) {
  return (
    <ActionForm action={resubmitShopAction} submitLabel="Submit for review again">
      <input type="hidden" name="shopId" value={shopId} />
    </ActionForm>
  )
}
