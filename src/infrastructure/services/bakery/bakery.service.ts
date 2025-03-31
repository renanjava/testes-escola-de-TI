import { Injectable } from '@nestjs/common'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import CreateBakeryUseCase from '@/application/bakery/usecases/create-bakery.use-case'
import FindAllBakeriesUseCase from '@/application/bakery/usecases/find-all-bakeries.use-case'
import FindOneBakeryUseCase from '@/application/bakery/usecases/find-one-bakery.use-case'
import UpdateBakeryUseCase from '@/application/bakery/usecases/update-bakery.use-case'
import RemoveBakeryUseCase from '@/application/bakery/usecases/remove-bakery.use-case'

@Injectable()
export class BakeryService {
  constructor(private readonly bakeryRepository: BakeryRepositoryImpl) {}
  async create(inputBakery: BakeryEntity) {
    const createBakeryUseCase = new CreateBakeryUseCase(this.bakeryRepository)
    const registeredBakery = await createBakeryUseCase.execute(inputBakery)
    return { ...registeredBakery }
  }

  async findAll() {
    const findAllBakeriesUseCase = new FindAllBakeriesUseCase(
      this.bakeryRepository,
    )
    return await findAllBakeriesUseCase.execute()
  }

  async findOne(id: string) {
    const findOneBakeryUseCase = new FindOneBakeryUseCase(this.bakeryRepository)
    return await findOneBakeryUseCase.execute(id)
  }

  async update(id: string, inputBakery: Partial<BakeryEntity>) {
    const updateBakeryUseCase = new UpdateBakeryUseCase(this.bakeryRepository)
    return await updateBakeryUseCase.execute(id, inputBakery)
  }

  async remove(id: string) {
    const removeBakeryUseCase = new RemoveBakeryUseCase(this.bakeryRepository)
    return await removeBakeryUseCase.execute(id)
  }
}
