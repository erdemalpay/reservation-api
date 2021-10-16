import * as reservation_controller from "./reservation.controller"
import * as reservation_service from "./reservation.service"
import * as reservation_repository from "./reservation.repository"

import * as reservation_dto from "./dto/reservation.dto"
describe("updateReservation", () => {
    let inst: any
    let inst2: any
    let inst3: any

    beforeEach(() => {
        inst = new reservation_repository.ReservationRepository(undefined)
        inst2 = new reservation_service.ReservationService(inst)
        inst3 = new reservation_controller.TableController(inst2)
    })

    test("0", () => {
        let param2: any = new reservation_dto.ReservationDto()
        let callFunction: any = () => {
            inst3.updateReservation("bc23a9d531064583ace8f67dad60f6bb", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param2: any = new reservation_dto.ReservationDto()
        let callFunction: any = () => {
            inst3.updateReservation(987650, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param2: any = new reservation_dto.ReservationDto()
        let callFunction: any = () => {
            inst3.updateReservation(12, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param2: any = new reservation_dto.ReservationDto()
        let callFunction: any = () => {
            inst3.updateReservation("a1969970175", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param2: any = new reservation_dto.ReservationDto()
        let callFunction: any = () => {
            inst3.updateReservation(56784, param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let param2: any = new reservation_dto.ReservationDto()
        let callFunction: any = () => {
            inst3.updateReservation(NaN, param2)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("deleteReservation", () => {
    let inst: any
    let inst2: any
    let inst3: any

    beforeEach(() => {
        inst = new reservation_repository.ReservationRepository(undefined)
        inst2 = new reservation_service.ReservationService(inst)
        inst3 = new reservation_controller.TableController(inst2)
    })

    test("0", () => {
        let callFunction: any = () => {
            inst3.deleteReservation("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst3.deleteReservation(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst3.deleteReservation(987650)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst3.deleteReservation(12)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst3.deleteReservation("a1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst3.deleteReservation(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
