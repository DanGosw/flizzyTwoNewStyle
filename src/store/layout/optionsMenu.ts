import router from "@/routes/index.js";

const navBarStore = defineStore("optionsMenu", {
    state: () => ({
        options: []
    }),
    actions: {
        async createOptionsMenu() {
            const routerViews = router.resolve({ name: "home" })?.matched[0].children;
            this.options = this.processRoutes(routerViews);
        },
        processRoutes(routes) {
            return routes.reduce((processedRoutes, route) => {
                const processedRoute = this.valuesRoutesMenu(route);
                if(processedRoute) {
                    processedRoutes.push(processedRoute);
                }
                return processedRoutes;
            }, []);
        },
        valuesRoutesMenu(route) {
            if(route.meta) {
                let objOption = {
                    label: route.meta.label,
                    key: route.name,
                    active: route.name,
                    path: route.path,
                    route: route.path,
                    meta: route.meta,
                    icon: route.meta.icon,
                    visible: true
                };
                // this.addIconToOption(objOption, route.meta.icon, route);
                
                if(route.children) {
                    delete objOption.path;
                    delete objOption.route;  // Eliminar el atributo `route` si hay `children`
                    objOption.items = this.processRoutes(route.children);
                    objOption.expand = false;
                    if(objOption.items.length) {
                        return objOption;
                    }
                } else {
                    return objOption;
                }
            }
            return null;
        }
        // addIconToOption(objOption, icon, route) {
        //     if(icon) {
        //         console.log(objOption);
        //         const routesDefines = router.resolve({ name: "home" })?.matched[0].children;
        //         const shouldUseIcon = routesDefines.some(rt => rt.name === route.name && rt.meta?.["icon"]);
        //         if(!shouldUseIcon) {
        //             objOption.meta.icon = h(icon?.render());
        //         }
        //     }
        // }
    }
});

export const optionsMenuStore = navBarStore();