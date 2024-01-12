import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import Typography from "@/features/Typography";


const MenuTabs = () => {
    return (
        <>
            <Tabs
                defaultValue="publications"
                className="w-full h-full">
                <TabsList className="w-full justify-between py-6 rounded-md">
                    < TabsTrigger
                        value="publications" className={'py-2 rounded-md w-full'}>
                        <Typography>
                            Publications
                        </Typography>
                    </TabsTrigger>
                    <TabsTrigger value="like" className={'py-2 rounded-md w-full'}>
                        <Typography>
                            Like
                        </Typography>
                    </TabsTrigger>
                </TabsList>
                <TabsContent className={'h-full'} value="publications">Grilles avec les publications</TabsContent>
                <TabsContent className={'h-full'} value="like">Récapitulatif des likes</TabsContent>
            </Tabs>
        </>
    )
}

export default MenuTabs;