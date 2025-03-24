import { CreateBakeryProps } from '@/infrastructure/model/entities/dto/bakery/create-bakery.dto'
import { faker } from '@faker-js/faker'

export function CreateBakeryDataBuilder(
  props: CreateBakeryProps,
): CreateBakeryProps {
  return {
    name: props.name || faker.company.name(),
    cnpj: props.cnpj || faker.string.numeric(8),
    address: props.address || faker.word.words(),
    openTime: props.openTime || faker.date.soon({ days: 10 }),
    closeTime: props.closeTime || Date.now(),
    managers: props.managers,
  }
}
