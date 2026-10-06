import { Loader2Icon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { useDeleteTransaction } from '@/api/hooks/transaction'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Button } from './ui/button'

const DeleteTransactionButton = ({ transactionId, onDeleted }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { mutateAsync: deleteTransaction, isPending } = useDeleteTransaction()

  const handleDelete = async () => {
    try {
      await deleteTransaction(transactionId)
      setIsOpen(false)
      onDeleted?.()
      toast.success('Transação deletada com sucesso!')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao deletar a transação. Tente novamente mais tarde!')
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          className="w-full"
        >
          Deletar transação
          <Trash2Icon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja deletar essa transação?</AlertDialogTitle>
          <AlertDialogDescription>
            Uma vez deletada, não será possível recuperá-la.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            type="button"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault()
              handleDelete()
            }}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionButton
