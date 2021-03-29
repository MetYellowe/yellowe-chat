<template>
    <div>
        <!--responsive text-->
        <v-container class="red lighten-5">
            <v-row class="pa-3">
                <h1
                    class="
                        text-h4
                        text-md-h2
                        text-lg-h1
                        text-xl-h1
                        text-truncate
                    "
                >
                    Also sprach Zarathustra
                </h1>
                <p
                    class="
                        text--secondary
                        text-caption
                        text-body-2
                        text-sm-body-2
                        text-md-body-1
                        text-lg-body-1
                        text-xl-body-1
                        text-justify
                    "
                >
                    Wehe! Es kommt die Zeit, wo der Mensch keinen Stern mehr gebären wird. Wehe! Es kommt die Weit des Verächtlichsten Menschen, der sich selber nicht mehr verachten kann.
                </p>
            </v-row>
        </v-container>
        <!--no-gutters-->
        <v-container class="green accent-1">
            <v-row no-gutters>
                <v-col
                    cols="12"
                    sm="6"
                    md="8"
                >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        .col-12 .col-sm-6 .col-md-8
                    </v-card>
                </v-col>
                <v-col
                    cols="6"
                    md="4"
                >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        .col-6 .col-md-4
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>