import RecipeFull from "../components/ViewForm/Recipes/RecipeFull/RecipeFull";

const Recipe = () => {
    const recipe = {
        name: 'Брауни',
        img: '',
        author: 'Anastsia Sheveleva',
        categories: ['Выпечка и десерты', 'Американская кухня'],
        content: 'Один из самых популярных десертов в мире — брауни — был придуман в 1893 году на кухне легендарного отеля Palmer House в Чикаго. Этот пирог там пекут до сих пор по оригинальному рецепту, покрывая сверху абрикосовой глазурью. В домашней версии, впрочем, у брауни получается такая изумительная сахарная корочка, что глазировать ее было бы преступлением. У традиционных шоколадных брауни ванильный аромат, хрустящая корочка и влажная серединка. В торт также добавляют грецкие орехи или фисташки, а еще клюкву.',
        time: 40,
        energyValue: {
            calories: 676,
            proteins: 10,
            fats: 46,
            carbohydrates: 55
        }, 
        ingredients: {
            numberServings: 6,
            ingredients: [
                {
                    ingredient: 'Темный шоколад',
                    gramms: 100
                },
                {
                    ingredient: 'Сливочное масло',
                    gramms: 180
                },
                {
                    ingredient: 'Коричневый сахар',
                    gramms: 200
                },
                {
                    ingredient: 'Куриное яйцо',
                    gramms: 200
                },
                {
                    ingredient: 'Пшеничная мука',
                    gramms: 100
                },
                {
                    ingredient: 'Грецкие орехи',
                    gramms: 100
                },
            ]
        },
        steps: [
            {
                img: '',
                content: 'Шоколад разломать на кусочки и вместе со сливочным маслом растопить на водяной бане, не переставая все время помешивать лопаткой или деревянной ложкой. Получившийся густой шоколадный соус снять с водяной бани и оставить остывать.'
            },
            {
                img: '',
                content: 'Тем временем смешать яйца со ста граммами коричневого сахара: яйца разбить в отдельную миску и взбить, постепенно добавляя сахар. Взбивать можно при помощи миксера или вручную — как больше нравится, — но не меньше двух с половиной-трех минут.'
            },
            {
                img: '',
                content: 'Острым ножом на разделочной доске порубить грецкие орехи. Предварительно их можно поджарить на сухой сковороде до появления аромата, но это необязательная опция.'
            },
            {
                img: '',
                content: 'В остывший растопленный со сливочным маслом шоколад аккуратно добавить оставшийся сахар, затем муку и измельченные орехи и все хорошо перемешать венчиком.'
            },
            {
                img: '',
                content: 'Затем влить сахарно-яичную смесь и тщательно смешать с шоколадной массой. Цвет у теста должен получиться равномерным, без разводов.'
            },
            {
                img: '',
                content: 'Разогреть духовку до 200 градусов. Дно небольшой глубокой огнеупорной формы выстелить листом бумаги для выпечки или калькой. Перелить тесто в форму. Поставить в духовку и выпекать двадцать пять — тридцать минут до появления сахарной корочки.'
            },
            {
                img: '',
                content: 'Готовый пирог вытащить из духовки, дать остыть и нарезать на квадратики острым ножом или ножом для пиццы — так кусочки получатся особенно ровными.'
            },
            {
                img: '',
                content: 'Подавать брауни можно просто так, а можно посыпать сверху сахарной пудрой или разложить квадратики по тарелкам и украсить каждую порцию шариком ванильного мороженого.'
            },
        ],
        advice: 'Можно посыпать сахарной пудрой (или подавать с шариком ванильного мороженого).'
    }
    return (
        <>
            <RecipeFull 
                recipe = {recipe}
            />
        </>
    )
}

export default Recipe;