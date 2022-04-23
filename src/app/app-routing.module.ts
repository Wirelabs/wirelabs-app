import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'hub-overview',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'hub-overview',
    loadChildren: () =>
      import('./pages/hub-overview/hub-overview.module').then(
        (m) => m.HubOverviewPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./pages/settings/settings.module').then(
        (m) => m.SettingsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'device-overview/:hubID',
    loadChildren: () =>
      import('./pages/device-overview/device-overview.module').then(
        (m) => m.DeviceOverviewPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'rgb-lamp/:deviceId',
    loadChildren: () =>
      import('./pages/devices/rgb-lamp/rgb-lamp.module').then(
        (m) => m.RgbLampPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'qr-code-generator',
    loadChildren: () =>
      import('./pages/qr-code-generator/qr-code-generator.module').then(
        (m) => m.QrCodeGeneratorPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'reset-password/:id',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'hub-update/:id',
    loadChildren: () => import('./pages/hub-update/hub-update.module').then( m => m.HubUpdatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-action',
    loadChildren: () => import('./modals/create-action/create-action.module').then( m => m.CreateActionPageModule)
  },
  {
    path: 'personal-informations',
    loadChildren: () => import('./pages/personal-informations/personal-informations.module').then( m => m.PersonalInformationsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
