'use client'

import React, { useState } from 'react'
import { useAdminUsers } from '@/hooks/useAdminUsers'
import { useShowMore } from '@/hooks/useShowMore'
import UserCard from '@/components/features/admin/users/UserCard'
import AddEmployeeModal from '@/components/features/admin/users/AddEmployeeModal'
import AdminSectionHeader from '@/components/features/admin/AdminSectionHeader'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ShowMoreButton } from '@/components/features/admin/dashboard/ShowMoreButton'

const AdminUsersPage = () => {
    const { users, loading, toggleStatus, changeRole, refetch } = useAdminUsers()
    const [searchQuery, setSearchQuery] = useState('')

    const filteredUsers = users.filter(user => {
        const query = searchQuery.toLowerCase()
        return user.name.toLowerCase().includes(query)
    })

    const admins = filteredUsers.filter(u => u.role === 'admin')
    const clients = filteredUsers.filter(u => u.role === 'client')
    const employees = filteredUsers.filter(u => u.role === 'employee')

    const { visibleItems: visibleAdmins, showAll: showAllAdmins, hasMore: hasMoreAdmins, toggleShowAll: toggleShowAllAdmins, remainingCount: remainingAdmins } = useShowMore({
        items: admins,
        initialCount: 3
    })

    const { visibleItems: visibleClients, showAll: showAllClients, hasMore: hasMoreClients, toggleShowAll: toggleShowAllClients, remainingCount: remainingClients } = useShowMore({
        items: clients,
        initialCount: 3
    })

    const { visibleItems: visibleEmployees, showAll: showAllEmployees, hasMore: hasMoreEmployees, toggleShowAll: toggleShowAllEmployees, remainingCount: remainingEmployees } = useShowMore({
        items: employees,
        initialCount: 3
    })

    return (
        <div className="flex flex-col gap-6 py-8 min-h-dvh bg-background pb-[90px]">

            {/* Header */}
            <div className="px-5 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[oklch(0.45_0_0)]">
                        Gestionare
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight text-gold-gradient leading-tight">
                        Utilizatori
                    </h1>
                </div>

                {/* Count badge */}
                {!loading && (
                    <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold"
                        style={{
                            background: 'oklch(0.18 0.04 80 / 0.5)',
                            borderColor: 'oklch(0.84 0.18 80 / 0.20)',
                            color: 'oklch(0.75 0.12 80)',
                        }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: 'oklch(0.84 0.18 80)', boxShadow: '0 0 6px oklch(0.84 0.18 80 / 0.7)' }}
                        />
                        {users.length} conturi
                    </div>
                )}
            </div>

            {/* Search bar */}
            <div className="px-4">
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 shrink-0"
                        style={{ color: 'oklch(0.45 0 0)' }}
                    />
                    <Input
                        type="text"
                        placeholder="Caută după nume sau email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-11 rounded-xl border-2 bg-[oklch(0.15_0_0)] text-sm placeholder:text-[oklch(0.45_0_0)]/60"
                        style={{
                            borderColor: 'oklch(0.84 0.18 80 / 0.15)',
                        }}
                    />
                </div>
            </div>

            {/* Admins */}
            <div className="flex flex-col gap-3">
                <AdminSectionHeader
                    title="Administratori"
                    action={
                        !loading && (
                            <span
                                className="inline-flex items-center py-[3px] px-[10px] rounded-full border text-[11px] font-semibold"
                                style={{
                                    background: 'oklch(0.25 0.08 280 / 0.20)',
                                    borderColor: 'oklch(0.55 0.18 280 / 0.40)',
                                    color: 'oklch(0.75 0.18 280)',
                                }}
                            >
                                {admins.length}
                            </span>
                        )
                    }
                />

                {loading ? (
                    <div className="flex flex-col gap-2 px-4">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="h-[68px] rounded-2xl animate-pulse bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.08)]" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 px-4">
                        {visibleAdmins.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onToggleStatus={toggleStatus}
                                onChangeRole={changeRole}
                            />
                        ))}
                        {hasMoreAdmins && (
                            <ShowMoreButton
                                showAll={showAllAdmins}
                                onClick={toggleShowAllAdmins}
                                remainingCount={remainingAdmins}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Employees */}
            <div className="flex flex-col gap-3">
                <AdminSectionHeader
                    title="Angajați"
                    action={
                        !loading && (
                            <span
                                className="inline-flex items-center py-[3px] px-[10px] rounded-full border text-[11px] font-semibold"
                                style={{
                                    background: 'oklch(0.30 0.08 80 / 0.20)',
                                    borderColor: 'oklch(0.84 0.18 80 / 0.40)',
                                    color: 'oklch(0.84 0.18 80)',
                                }}
                            >
                                {employees.length}
                            </span>
                        )
                    }
                />

                {loading ? (
                    <div className="flex flex-col gap-2 px-4">
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="h-[68px] rounded-2xl animate-pulse bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.08)]" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 px-4">
                        {visibleEmployees.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onToggleStatus={toggleStatus}
                                onChangeRole={changeRole}
                            />
                        ))}
                        {hasMoreEmployees && (
                            <ShowMoreButton
                                showAll={showAllEmployees}
                                onClick={toggleShowAllEmployees}
                                remainingCount={remainingEmployees}
                            />
                        )}
                        <AddEmployeeModal onSuccess={refetch} />
                    </div>
                )}
            </div>

            {/* Clients */}
            <div className="flex flex-col gap-3">
                <AdminSectionHeader
                    title="Clienți"
                    action={
                        !loading && (
                            <span
                                className="inline-flex items-center py-[3px] px-[10px] rounded-full border text-[11px] font-semibold"
                                style={{
                                    background: 'oklch(0.20 0 0 / 0.40)',
                                    borderColor: 'oklch(0.35 0 0 / 0.50)',
                                    color: 'oklch(0.60 0 0)',
                                }}
                            >
                                {clients.length}
                            </span>
                        )
                    }
                />

                {loading ? (
                    <div className="flex flex-col gap-2 px-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-[68px] rounded-2xl animate-pulse bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.08)]" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 px-4">
                        {visibleClients.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onToggleStatus={toggleStatus}
                                onChangeRole={changeRole}
                            />
                        ))}
                        {hasMoreClients && (
                            <ShowMoreButton
                                showAll={showAllClients}
                                onClick={toggleShowAllClients}
                                remainingCount={remainingClients}
                            />
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}

export default AdminUsersPage
