import { Injectable } from '@nestjs/common'
import { BakeryRepositoryImpl } from '@/infrastructure/repositories/bakery/impl-bakery.repository'
import BakeryEntity from '@/domain/bakery/entities/bakery.entity'
import CreateBakeryUseCase from '@/application/usecases/bakery/create-bakery.use-case'
import FindAllBakeriesUseCase from '@/application/usecases/bakery/find-all-bakeries.use-case'
import FindOneBakeryUseCase from '@/application/usecases/bakery/find-one-bakery.use-case'
import UpdateBakeryUseCase from '@/application/usecases/bakery/update-bakery.use-case'
import RemoveBakeryUseCase from '@/application/usecases/bakery/remove-bakery.use-case'

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
